// Sidebar Component

import { X, Box } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { ModelsTab } from './sidebar/ModelsTab';

export function Sidebar() {
  const { isSidebarOpen, setSidebarOpen } = useUIStore();

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
            <Box size={20} className="text-wizzy-accent" />
            Model Manager
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 text-wizzy-text-muted hover:text-wizzy-text-main rounded-lg hover:bg-wizzy-surface-hover"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Content*/}
        <div className="flex-1 overflow-y-auto">
          <ModelsTab />
        </div>
        
      </aside>
    </>
  );
}