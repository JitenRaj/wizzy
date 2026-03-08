// Header

import { Menu, Settings } from 'lucide-react';
import { useModelViewModel } from '../viewmodels/useModelViewModel';
import { useUIStore } from '../store/uiStore';

export function Header() {
  const { status } = useModelViewModel();
  const { toggleSidebar } = useUIStore();

  const renderStatus = () => {
    switch (status) {
      case 'ONLINE':
        return <span className="flex items-center gap-2 text-green-400 text-sm"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online</span>;
      case 'DOWNLOADING':
        return <span className="text-blue-400 text-sm animate-pulse">Downloading...</span>;
      case 'LOADING':
        return <span className="text-yellow-400 text-sm animate-pulse">Loading Model...</span>;
      case 'ERROR':
        return <span className="text-red-400 text-sm">Error</span>;
      default:
        return <span className="text-gray-500 text-sm">Offline</span>;
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-wizzy-border bg-wizzy-surface/50 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-wizzy-surface-hover rounded-lg transition-colors text-wizzy-text-muted hover:text-wizzy-text-main"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold bg-linear-to-r from-wizzy-accent to-purple-500 bg-clip-text text-transparent">
          Wizzy
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        {renderStatus()}
        <button className="p-2 hover:bg-wizzy-surface-hover rounded-lg transition-colors text-wizzy-text-muted hover:text-wizzy-text-main">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}