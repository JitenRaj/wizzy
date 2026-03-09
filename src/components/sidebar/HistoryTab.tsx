// History Tab Component

import { useEffect } from 'react';
import { MessageSquare, Plus, Trash2, Clock } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useUIStore } from '../../store/uiStore';

export function HistoryTab() {
  const { 
    sessionList, 
    loadAllSessions, 
    currentSessionId, 
    loadSession, 
    createNewSession, 
    deleteSession 
  } = useChatStore();
  
  const { setSidebarOpen } = useUIStore();

  useEffect(() => {
    loadAllSessions();
  }, [loadAllSessions]);

  const handleSelectSession = (id: string) => {
    loadSession(id);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleNewChat = () => {
    createNewSession();
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      {/* New Chat Button */}
      <button 
        onClick={handleNewChat}
        className="w-full flex items-center justify-center gap-2 bg-wizzy-accent hover:bg-wizzy-accent-hover text-white py-3 px-4 rounded-xl transition-colors font-medium"
      >
        <Plus size={20} /> New Chat
      </button>

      {/* History List */}
      <div className="flex-1 overflow-y-auto pr-1 -mr-1 space-y-2">
        <h3 className="text-xs font-semibold text-wizzy-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
          <Clock size={14} /> Recent Conversations
        </h3>

        {sessionList.length === 0 ? (
          <p className="text-sm text-wizzy-text-muted text-center py-8">No past conversations yet.</p>
        ) : (
          sessionList.map((session) => (
            <div 
              key={session.id}
              className={`group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                currentSessionId === session.id 
                  ? 'bg-wizzy-surface border-wizzy-accent text-wizzy-text-main' 
                  : 'bg-wizzy-bg border-transparent hover:bg-wizzy-surface-hover hover:border-wizzy-border text-wizzy-text-muted hover:text-wizzy-text-main'
              }`}
              onClick={() => handleSelectSession(session.id)}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <MessageSquare size={16} className="shrink-0" />
                <span className="text-sm truncate select-none">
                  {session.title}
                </span>
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(session.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-wizzy-text-muted hover:text-red-400 transition-all shrink-0"
                title="Delete Chat"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}