// src/store/chatStore.ts
import { create } from 'zustand';
import { ChatMessage, ChatSession } from '../models/types';
import { SessionRepository } from '../repositories/SessionRepository';

interface ChatState {
  currentSessionId: string | null;
  messages: ChatMessage[];
  liveToken: string;
  isGenerating: boolean;
  systemPrompt: string;
  sessionList: ChatSession[];

  setSystemPrompt: (prompt: string) => void;
  setLiveToken: (token: string) => void;
  setIsGenerating: (isGen: boolean) => void;
  
  addMessage: (message: ChatMessage) => void;
  loadSession: (sessionId: string) => void;
  createNewSession: () => void;
  loadAllSessions: () => void; 
  deleteSession: (sessionId: string) => void; 
}

export const useChatStore = create<ChatState>((set) => ({
  currentSessionId: null,
  messages: [],
  liveToken: '',
  isGenerating: false,
  systemPrompt: 'I am Wizzy, a helpful, smart, and friendly AI assistant.',
  sessionList: [],

  setSystemPrompt: (prompt) => set({ systemPrompt: prompt }),
  setLiveToken: (token) => set({ liveToken: token }),
  setIsGenerating: (isGen) => set({ isGenerating: isGen }),

  loadAllSessions: () => {
    const sessions = SessionRepository.getAllSessions();
    set({ sessionList: sessions });
  },

  addMessage: (message) => {
    set((state) => {
      const newMessages = [...state.messages, message];
      
      let sessionId = state.currentSessionId;
      if (!sessionId) {
        sessionId = crypto.randomUUID();
      }

      const sessionTitle = newMessages[0]?.content.substring(0, 40) || 'New Chat';
      
      const sessionToSave: ChatSession = {
        id: sessionId,
        title: sessionTitle,
        updatedAt: Date.now(),
        messages: newMessages
      };

      SessionRepository.saveSession(sessionToSave);
      
      const updatedSessions = SessionRepository.getAllSessions();

      return { 
        messages: newMessages, 
        currentSessionId: sessionId,
        sessionList: updatedSessions
      };
    });
  },

  loadSession: (sessionId) => {
    const sessions = SessionRepository.getAllSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      set({ 
        currentSessionId: session.id, 
        messages: session.messages, 
        liveToken: '', 
        isGenerating: false 
      });
    }
  },

  createNewSession: () => {
    set({ currentSessionId: null, messages: [], liveToken: '', isGenerating: false });
  },

  deleteSession: (sessionId) => {
    SessionRepository.deleteSession(sessionId);
    const updatedSessions = SessionRepository.getAllSessions();
    
    set((state) => {
      if (state.currentSessionId === sessionId) {
        return { sessionList: updatedSessions, currentSessionId: null, messages: [] };
      }
      return { sessionList: updatedSessions };
    });
  }
}));