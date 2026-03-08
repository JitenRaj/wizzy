// Model View Model

import { useModelStore } from '../store/modelStore';
import { engineService } from '../services/WllamaService';

export const useModelViewModel = () => {
  const { 
    status, 
    setStatus, 
    setLoadedModelName, 
    updateDownloadProgress, 
    activeDownloads 
  } = useModelStore();

  const loadFromUrl = async (url: string) => {
    try {
      setStatus('DOWNLOADING');
      
      await engineService.loadModelFromUrl(url, (progress) => {
        updateDownloadProgress(url, progress);
      });

      // Done downloading and loading
      updateDownloadProgress(url, null);
      const name = await engineService.getLoadedModelName();
      setLoadedModelName(name);
      setStatus('ONLINE');
      
    } catch (error) {
      console.error("Failed to load from URL:", error);
      setStatus('ERROR');
      updateDownloadProgress(url, null);
    }
  };

  const loadFromFile = async (file: File) => {
    try {
      setStatus('LOADING');
      await engineService.loadModelFromFile(file);
      
      const name = await engineService.getLoadedModelName();
      setLoadedModelName(name);
      setStatus('ONLINE');
    } catch (error) {
      console.error("Failed to load file:", error);
      setStatus('ERROR');
    }
  };

  const unloadModel = async () => {
    await engineService.unload();
    setStatus('OFFLINE');
    setLoadedModelName('No Model Loaded');
  };

  return {
    status,
    activeDownloads,
    loadFromUrl,
    loadFromFile,
    unloadModel
  };
};