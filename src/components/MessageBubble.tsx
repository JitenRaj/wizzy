// Message Bubble Component

import { User, Bot, BrainCircuit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Role } from '../models/types';

interface MessageBubbleProps {
  role: Role;
  content: string;
  isLive?: boolean;
}

export function MessageBubble({ role, content, isLive }: MessageBubbleProps) {
  const isUser = role === 'user';

  // Function to elegantly split and render <think> blocks
  const renderContent = (text: string) => {
    if (!text) return null;

    // Splits the text by <think> tags, keeping the tags in the output for identification
    const parts = text.split(/(<think>[\s\S]*?<\/think>|<think>[\s\S]*?$)/g);

    return parts.map((part, index) => {
      if (part.startsWith('<think>')) {
        const thought = part.replace('<think>', '').replace('</think>', '');
        return (
          <details key={index} className="group mb-4 bg-wizzy-surface-hover/50 rounded-lg border border-wizzy-border overflow-hidden">
            <summary className="flex items-center gap-2 px-4 py-2 cursor-pointer text-xs font-medium text-wizzy-text-muted hover:text-wizzy-text-main transition-colors list-none">
              <BrainCircuit size={14} className="group-open:text-wizzy-accent transition-colors" />
              <span>View Thinking Process</span>
            </summary>
            <div className="px-4 py-3 border-t border-wizzy-border/50 text-sm text-wizzy-text-muted italic bg-wizzy-surface-hover/30">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {thought}
              </ReactMarkdown>
            </div>
          </details>
        );
      } else if (part.trim()) {
        return (
          <div key={index} className="prose prose-invert prose-sm md:prose-base max-w-none prose-pre:bg-wizzy-surface-hover prose-pre:border prose-pre:border-wizzy-border prose-p:leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {part}
            </ReactMarkdown>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className={`flex gap-4 w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6 group`}>
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-wizzy-surface border border-wizzy-border flex items-center justify-center text-wizzy-accent mt-1">
          <Bot size={18} />
        </div>
      )}

      {/* Message Container */}
      <div 
        className={`max-w-[85%] rounded-2xl px-5 py-3 ${
          isUser 
            ? 'bg-wizzy-accent text-white rounded-tr-none shadow-md shadow-wizzy-accent/10' 
            : 'bg-wizzy-surface border border-wizzy-border rounded-tl-none text-wizzy-text-main'
        }`}
      >
        {isLive && !content ? (
          <div className="flex gap-1 items-center h-6">
            <span className="w-2 h-2 rounded-full bg-wizzy-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-wizzy-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-wizzy-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          renderContent(content)
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-wizzy-surface-hover border border-wizzy-border flex items-center justify-center text-wizzy-text-main mt-1">
          <User size={18} />
        </div>
      )}
    </div>
  );
}