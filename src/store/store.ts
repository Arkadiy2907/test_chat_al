import { create } from 'zustand';

export const WORD_LIMIT = 10000;

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

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    { id: '1', role: 'assistant', content: 'Привет! Чем могу помочь?' }
  ],
  streamingContent: '',
  isGenerating: false,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setStreamingContent: (content) => set({ streamingContent: content }),
  appendStreamingContent: (chunk) => {
    const { streamingContent, isGenerating } = get();

    if (!isGenerating) return;

    const currentWords = streamingContent.split(/\s+/).filter(Boolean).length;

    if (currentWords >= WORD_LIMIT) {
      set({ isGenerating: false });
      return;
    }

    set({ streamingContent: streamingContent + chunk });
  },
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  stopGeneration: () =>
    set({ isGenerating: false, streamingContent: '' }),
}));
