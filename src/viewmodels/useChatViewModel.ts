// Chat View Model

import { useChatStore } from '../store/chatStore';
import { useModelStore } from '../store/modelStore';
import { engineService } from '../services/WllamaService';
import { ChatMessage } from '../models/types';

export const useChatViewModel = () => {
  const { 
    messages, 
    addMessage, 
    setLiveToken, 
    setIsGenerating, 
    isGenerating,
    systemPrompt 
  } = useChatStore();
  
  const { status } = useModelStore();

  const sendMessage = async (content: string) => {
    if (!content.trim() || isGenerating) return;

    // Create the user's message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    // Add user message to state
    addMessage(userMessage);

    // Prepare for AI generation
    setIsGenerating(true);
    setLiveToken('');

    try {
      // Call the engine and stream tokens to the store
      const responseText = await engineService.generateResponse(
        systemPrompt,
        messages,
        content,
        (token) => setLiveToken(token)
      );

      // Once finished, save the final AI message
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: responseText,
        timestamp: Date.now(),
      };

      addMessage(aiMessage);
      
    } catch (error) {
      console.error("AI Generation failed:", error);
      
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'system',
        content: "Sorry, I encountered an error while generating a response.",
        timestamp: Date.now(),
      };
      addMessage(errorMessage);

    } finally {
      // Clean up
      setLiveToken('');
      setIsGenerating(false);
    }
  };

  const stopGeneration = () => {
    engineService.stopGeneration();
    setIsGenerating(false);
  };

  return {
    messages,
    sendMessage,
    stopGeneration,
    isGenerating,
    isModelReady: status === 'ONLINE',
  };
};