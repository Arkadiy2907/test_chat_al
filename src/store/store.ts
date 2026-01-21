import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatState {
  messages: Message[];
  streamingContent: string;
  isGenerating: boolean;
  addMessage: (message: Message) => void;
  setStreamingContent: (content: string) => void;
  appendStreamingContent: (chunk: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  stopGeneration: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    { id: '1', role: 'assistant', content: 'Привет! Чем могу помочь?' }
  ],
  streamingContent: '',
  isGenerating: false,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setStreamingContent: (content) => set({ streamingContent: content }),
  appendStreamingContent: (chunk) =>
    set((state) => ({ streamingContent: state.streamingContent + chunk })),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  stopGeneration: () =>
    set({ isGenerating: false, streamingContent: '' }),
}));
