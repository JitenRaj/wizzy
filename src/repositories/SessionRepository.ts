// Session Repository

import { ChatSession } from '../models/types';

const STORAGE_KEY = 'wizzy_sessions';

export class SessionRepository {

  // Retrieves all chat sessions from local storage

  static getAllSessions(): ChatSession[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load sessions from storage:', error);
      return [];
    }
  }

  // Saves a full list of chat sessions to local storage

  static saveAllSessions(sessions: ChatSession[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Failed to save sessions to storage:', error);
    }
  }

  // Updates an existing session or adds a new session

  static saveSession(session: ChatSession): void {
    const sessions = this.getAllSessions();
    const existingIndex = sessions.findIndex((s) => s.id === session.id);

    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.unshift(session);
    }

    this.saveAllSessions(sessions);
  }

  // Delete a session

  static deleteSession(id: string): void {
    const sessions = this.getAllSessions();
    const filtered = sessions.filter((s) => s.id !== id);
    this.saveAllSessions(filtered);
  }
}