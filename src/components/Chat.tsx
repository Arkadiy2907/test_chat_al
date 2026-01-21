import { useRef } from 'react';
import { useChatStore } from '../store/store';
import { ChatInput } from './ChatInput';
import { v4 as uuidv4 } from 'uuid';
import { MessageList } from './MessageList';
import { lorem } from '../utils/lorem';

export const Chat = () => {
  const {
    addMessage,
    setStreamingContent,
    appendStreamingContent,
    isGenerating,
    streamingContent,
    setIsGenerating,
  } = useChatStore();

  const intervalRef = useRef<number | null>(null);

  const handleGenerate = (inputText: string) => {
    if (!inputText.trim()) return; 

    const userMessage = {
      id: uuidv4(),
      role: 'user' as const,
      content: inputText };
    addMessage(userMessage);
    
    setIsGenerating(true);
    setStreamingContent('');

    let wordCount = 0;
    const totalWords = 10000;
    const wordsPerChunk = 5;

    const loremWords = lorem.split(' ');

    const generateChunk = () => {
      if (wordCount >= totalWords) {
        handleStop();
        return;
      }

      const chunk = loremWords.slice(wordCount % loremWords.length, (wordCount % loremWords.length) + wordsPerChunk).join(' ') + ' ';
      appendStreamingContent(chunk);
      wordCount += wordsPerChunk;
    };

    intervalRef.current = window.setInterval(generateChunk, 15); 
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const finalContent = streamingContent.trim();
    if (finalContent) {
      addMessage({
        id: uuidv4(),
        role: 'assistant',
        content: finalContent,
      });
    }
    setStreamingContent('');
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-xl w-full max-w-xl">
      <MessageList />
      <div className="p-4 border-t border-gray-700">
        <ChatInput
          onGenerate={handleGenerate}
          onStop={handleStop}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
};
