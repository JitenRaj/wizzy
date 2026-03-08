// Input Area

import { useState, KeyboardEvent } from 'react';
import { Send, Square } from 'lucide-react';
import { useChatViewModel } from '../viewmodels/useChatViewModel';

export function InputArea() {
  const [input, setInput] = useState('');
  const { sendMessage, isGenerating, stopGeneration, isModelReady } = useChatViewModel();

  const handleSend = () => {
    if (!input.trim() || isGenerating || !isModelReady) return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-wizzy-bg w-full max-w-4xl mx-auto">
      <div className="relative flex items-end gap-2 bg-wizzy-surface border border-wizzy-border rounded-2xl p-2 focus-within:ring-2 ring-wizzy-accent/50 transition-all">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isModelReady ? "Ask Wizzy anything..." : "Load a model to start chatting..."}
          disabled={!isModelReady}
          className="w-full max-h-48 min-h-11 bg-transparent resize-none outline-none py-3 px-4 text-wizzy-text-main placeholder:text-wizzy-text-muted disabled:opacity-50"
          rows={1}
        />
        
        <div className="flex items-center pb-1 pr-1">
          {isGenerating ? (
            <button 
              onClick={stopGeneration}
              className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
            >
              <Square size={20} fill="currentColor" />
            </button>
          ) : (
            <button 
              onClick={handleSend}
              disabled={!input.trim() || !isModelReady}
              className="p-3 rounded-xl bg-wizzy-accent text-white hover:bg-wizzy-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          )}
        </div>
      </div>
      <p className="text-sm text-center text-wizzy-text-muted mt-5 mb-5">
        Wizzy AI runs entirely in your browser. No data is sent to the cloud.
      </p>
    </div>
  );
}