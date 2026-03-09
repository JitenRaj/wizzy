// Sidebar Component

import { useState } from 'react';
import { X, Box, MessageSquare } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { ModelsTab } from './sidebar/ModelsTab';
import { HistoryTab } from './sidebar/HistoryTab';

type Tab = 'models' | 'history';

export function Sidebar() {
  const { isSidebarOpen, setSidebarOpen } = useUIStore();
  const [activeTab, setActiveTab] = useState<Tab>('models');

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Container */}
      <aside className="fixed md:static inset-y-0 left-0 z-30 w-80 bg-wizzy-bg border-r border-wizzy-border flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0">
        
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-wizzy-border shrink-0">
          <div className="flex items-center gap-2 text-wizzy-text-main font-semibold">
            {activeTab === 'models' ? <Box size={20} className="text-wizzy-accent" /> : <MessageSquare size={20} className="text-wizzy-accent" />}
            {activeTab === 'models' ? 'Model Manager' : 'Chat History'}
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 text-wizzy-text-muted hover:text-wizzy-text-main rounded-lg hover:bg-wizzy-surface-hover"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex p-2 gap-1 bg-wizzy-surface/30 border-b border-wizzy-border shrink-0">
          <button 
            onClick={() => setActiveTab('models')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'models' ? 'bg-wizzy-surface text-wizzy-text-main shadow-sm border border-wizzy-border' : 'text-wizzy-text-muted hover:text-wizzy-text-main hover:bg-wizzy-surface-hover/50'
            }`}
          >
            <Box size={16} /> Models
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'history' ? 'bg-wizzy-surface text-wizzy-text-main shadow-sm border border-wizzy-border' : 'text-wizzy-text-muted hover:text-wizzy-text-main hover:bg-wizzy-surface-hover/50'
            }`}
          >
            <MessageSquare size={16} /> History
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'models' ? <ModelsTab /> : <HistoryTab />}
        </div>
        
      </aside>
    </>
  );
}