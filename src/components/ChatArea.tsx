// Chat Area Component

import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/chatStore';
import { MessageBubble } from './MessageBubble';
import { useModelStore } from '../store/modelStore';

export function ChatArea() {
  const { messages, liveToken, isGenerating } = useChatStore();
  const { status } = useModelStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, liveToken]);

  // If there are no messages, show the welcome screen
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-wizzy-surface flex items-center justify-center mb-6 shadow-lg border border-wizzy-border">
          <span className="text-3xl font-bold bg-gradient-to-tr from-wizzy-accent to-purple-500 bg-clip-text text-transparent">W</span>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-wizzy-text-main">Welcome to Wizzy</h2>
        <p className="text-wizzy-text-muted max-w-md">
          {status === 'ONLINE' 
            ? "Your model is loaded and ready. Type a message below to begin."
            : "To get started, open the sidebar and load a local LLM model."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto w-full scroll-smooth">
      <div className="max-w-4xl mx-auto w-full p-4 pt-6 flex flex-col">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}
        
        {/* Render the actively generating message */}
        {isGenerating && (
          <MessageBubble role="assistant" content={liveToken} isLive={true} />
        )}
        
        {/* Invisible div to scroll to */}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}