// Chat Store
import { create } from 'zustand';
import { ChatMessage } from '../models/types';
import { SessionRepository } from '../repositories/SessionRepository';

interface ChatState {
  // State
  currentSessionId: string | null;
  messages: ChatMessage[];
  liveToken: string;
  isGenerating: boolean;
  systemPrompt: string;

  // Actions
  setSystemPrompt: (prompt: string) => void;
  setLiveToken: (token: string) => void;
  setIsGenerating: (isGen: boolean) => void;
  
  // Complex Actions
  addMessage: (message: ChatMessage) => void;
  loadSession: (sessionId: string) => void;
  createNewSession: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  currentSessionId: null,
  messages: [],
  liveToken: '',
  isGenerating: false,
  systemPrompt: 'You are Wizzy, a helpful, smart, and friendly AI assistant.',
  // Default prompt

  setSystemPrompt: (prompt) => set({ systemPrompt: prompt }),
  setLiveToken: (token) => set({ liveToken: token }),
  setIsGenerating: (isGen) => set({ isGenerating: isGen }),

  addMessage: (message) => {
    set((state) => {
      const newMessages = [...state.messages, message];
      
      let sessionId = state.currentSessionId;
      if (!sessionId) {
        sessionId = crypto.randomUUID();
      }

      const sessionTitle = newMessages[0]?.content.substring(0, 40) || 'New Chat';
      
      SessionRepository.saveSession({
        id: sessionId,
        title: sessionTitle,
        updatedAt: Date.now(),
        messages: newMessages
      });

      return { messages: newMessages, currentSessionId: sessionId };
    });
  },

  loadSession: (sessionId) => {
    const sessions = SessionRepository.getAllSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      set({ currentSessionId: session.id, messages: session.messages, liveToken: '', isGenerating: false });
    }
  },

  createNewSession: () => {
    set({ currentSessionId: null, messages: [], liveToken: '', isGenerating: false });
  }
}));