// Models Tab Component

import { Upload, Download, Trash2 } from 'lucide-react';
import { useModelViewModel } from '../../viewmodels/useModelViewModel';
import { useModelStore } from '../../store/modelStore'; // <-- Imported store to get loadedModelName
import { ChangeEvent } from 'react';

// Recommended models data
import recommendedModels from '../../data/models.json';

export function ModelsTab() {
  const { loadFromFile, loadFromUrl, unloadModel, status, activeDownloads } = useModelViewModel();
  const { loadedModelName } = useModelStore();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFromFile(file);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Current Model Status */}
      <div className="bg-wizzy-surface-hover border border-wizzy-border rounded-xl p-4">
        <h3 className="text-xs font-semibold text-wizzy-text-muted uppercase tracking-wider mb-2">Current Model</h3>
        <p className="font-medium text-wizzy-text-main truncate" title={loadedModelName}>
          {loadedModelName || "None"}
        </p>
        {status === 'ONLINE' && (
          <button 
            onClick={unloadModel}
            className="mt-3 flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 size={16} /> Unload from Memory
          </button>
        )}
      </div>

      {/* Manual Upload */}
      <div>
        <h3 className="text-xs font-semibold text-wizzy-text-muted uppercase tracking-wider mb-3">Upload Local File</h3>
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-wizzy-border rounded-xl hover:bg-wizzy-surface-hover hover:border-wizzy-accent transition-all cursor-pointer group">
          <Upload size={28} className="text-wizzy-text-muted group-hover:text-wizzy-accent mb-2" />
          <span className="text-sm font-medium text-wizzy-text-main">Select .gguf file</span>
          <span className="text-xs text-wizzy-text-muted mt-1">Runs 100% locally</span>
          <input type="file" accept=".gguf" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>

      {/* Recommended Downloads */}
      <div>
        <h3 className="text-xs font-semibold text-wizzy-text-muted uppercase tracking-wider mb-3">Recommended</h3>
        <div className="flex flex-col gap-3">
          {/* Explicitly typed to prevent TS 'any' errors */}
          {recommendedModels.map((model: { name: string, size: string, url: string }) => {
            const downloadInfo = activeDownloads[model.url];
            const isDownloading = !!downloadInfo;
            
            return (
              <div key={model.url} className="bg-wizzy-surface border border-wizzy-border rounded-xl p-3 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-wizzy-text-main">{model.name}</p>
                    <p className="text-xs text-wizzy-text-muted">{model.size}</p>
                  </div>
                  
                  {isDownloading ? (
                     <div className="text-wizzy-accent animate-pulse"><Download size={18} /></div>
                  ) : (
                    <button 
                      onClick={() => loadFromUrl(model.url)}
                      className="text-wizzy-text-muted hover:text-wizzy-accent transition-colors"
                      title="Download & Load"
                    >
                      <Download size={18} />
                    </button>
                  )}
                </div>

                {/* Progress Bar */}
                {isDownloading && (
                  <div className="w-full mt-1">
                    <div className="flex justify-between text-[10px] text-wizzy-text-muted mb-1">
                      <span>{downloadInfo.details}</span>
                      <span>{downloadInfo.progressPercentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-wizzy-bg rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-wizzy-accent rounded-full transition-all duration-300"
                        style={{ width: `${downloadInfo.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}