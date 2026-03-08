// types

export type Role = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  updatedAt: number;
  messages: ChatMessage[];
}

export interface ModelConfig {
  nPredict?: number;
  temperature?: number;
  topK?: number;
  topP?: number;
  nCtx?: number;
}

export interface DownloadProgress {
  loaded: number;
  total: number;
  progressPercentage: number;
  details: string;
}

export type EngineStatus = 
  | 'OFFLINE' 
  | 'DOWNLOADING' 
  | 'LOADING' 
  | 'ONLINE' 
  | 'THINKING' 
  | 'ERROR';