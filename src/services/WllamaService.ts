// Wllama Service

import { Wllama, WllamaChatMessage } from '@wllama/wllama';
import { ChatMessage, DownloadProgress } from '../models/types';

export class WllamaService {
  private wllama: Wllama | null = null;
  private abortController: AbortController | null = null;

  
  // Initializes the Wllama instance with the WASM files
   
  async initialize(): Promise<void> {
    if (this.wllama) return;
    
    this.wllama = new Wllama({
      'single-thread/wllama.wasm': '/wllama/single-thread/wllama.wasm',
      'multi-thread/wllama.wasm': '/wllama/multi-thread/wllama.wasm'
    });
  }

  // Loads a model directly from a given URL

  async loadModelFromUrl(
    url: string, 
    onProgress: (progress: DownloadProgress) => void
  ): Promise<void> {
    await this.initialize();
    await this.unload();

    await this.wllama?.loadModelFromUrl(url, {
      useCache: true,
      progressCallback: ({ loaded, total }) => {
        const pct = Math.round((loaded / total) * 100);
        const details = `${(loaded / 1024 / 1024).toFixed(1)}MB / ${(total / 1024 / 1024).toFixed(1)}MB`;
        onProgress({ loaded, total, progressPercentage: pct, details });
      }
    });
  }

  
  // Loads a model from a local file uploaded by the user.

  async loadModelFromFile(file: File): Promise<void> {
    await this.initialize();
    await this.unload();
    await this.wllama?.loadModel([file]);
  }

  // Formats the chat history and prompts the AI, streaming the response via callbacks

  async generateResponse(
    systemPrompt: string,
    history: ChatMessage[],
    userPrompt: string,
    onToken: (text: string) => void
  ): Promise<string> {
    if (!this.wllama || !this.wllama.isModelLoaded()) {
      throw new Error("Cannot generate response: No model is currently loaded.");
    }

    this.abortController = new AbortController();

    // Map custom ChatMessage type to the Wllama expected type

    const formattedHistory: WllamaChatMessage[] = history.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Format the final prompt using the model's specific chat template

    const prompt = await this.wllama.formatChat([
      { role: 'system', content: systemPrompt },
      ...formattedHistory,
      { role: 'user', content: userPrompt }
    ], true);

    // Generate the completion

    const response = await this.wllama.createCompletion(prompt, {
      nPredict: 500,
      abortSignal: this.abortController.signal,
      onNewToken: (_token, _piece, text) => {
        onToken(text);
      }
    });

    return response;
  }

  // Aborts the current generation process if it's running

  stopGeneration(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  // Unloads the currently loaded model to free up memory

  async unload(): Promise<void> {
    if (this.wllama && this.wllama.isModelLoaded()) {
      await this.wllama.exit();
      this.wllama = null; // Force re-initialization on next load
    }
  }

  // Get the name of the currently loaded model

  async getLoadedModelName(): Promise<string> {
    if (!this.wllama || !this.wllama.isModelLoaded()) return 'No model loaded';
    const metadata = await this.wllama.getModelMetadata();
    return metadata.meta["general.name"] || 'Unknown Model';
  }
}

// Export a singleton instance so the entire app shares the same AI engine in memory

export const engineService = new WllamaService();