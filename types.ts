export interface GameState {
  code: string;
  isTyping: boolean;
  lastUpdated: number;
}

export enum EditorMode {
  EDIT = 'EDIT',
  PREVIEW = 'PREVIEW',
  SPLIT = 'SPLIT'
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
}
