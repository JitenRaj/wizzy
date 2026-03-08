// Model Store

import { create } from 'zustand';
import { EngineStatus, ModelConfig, DownloadProgress } from '../models/types';

interface ModelState {
  // State
  status: EngineStatus;
  loadedModelName: string;
  activeDownloads: Record<string, DownloadProgress>;
  config: ModelConfig;

  // Actions
  setStatus: (status: EngineStatus) => void;
  setLoadedModelName: (name: string) => void;
  updateDownloadProgress: (url: string, progress: DownloadProgress | null) => void;
  updateConfig: (config: Partial<ModelConfig>) => void;
}

export const useModelStore = create<ModelState>((set) => ({
  status: 'OFFLINE',
  loadedModelName: 'No Model Loaded',
  activeDownloads: {},
  config: {
    nPredict: 500,
    temperature: 0.7,
    topK: 40,
    topP: 0.9,
    nCtx: 4096,
  },

  setStatus: (status) => set({ status }),
  
  setLoadedModelName: (name) => set({ loadedModelName: name }),
  
  updateDownloadProgress: (url, progress) => set((state) => {
    const newDownloads = { ...state.activeDownloads };
    if (progress === null) {
      delete newDownloads[url];
    } else {
      newDownloads[url] = progress;
    }
    return { activeDownloads: newDownloads };
  }),

  updateConfig: (newConfig) => set((state) => ({
    config: { ...state.config, ...newConfig }
  }))
}));