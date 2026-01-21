import { useMemo } from 'react';
import { useChatStore } from '../store/store';
import { MessageItem } from './MessageItem';
import { Virtuoso } from 'react-virtuoso';
import type { Message } from '../types/types';

export const MessageList = () => {
  const messages = useChatStore((state) => state.messages);
  const streamingContent = useChatStore((state) => state.streamingContent);
  const isGenerating = useChatStore((state) => state.isGenerating);

  const allMessages = useMemo(() => {
    const combinedMessages: Message[] = [...messages];
    if (isGenerating || (streamingContent && streamingContent.length > 0)) {
      combinedMessages.push({
        id: 'streaming-message', 
        role: 'assistant',
        content: streamingContent || '...', 
        isStreaming: true, 
      });
    }
    return combinedMessages;
  }, [messages, isGenerating, streamingContent]);

  const followOutput = isGenerating ? 'auto' : false;

  return ( 
    <div className="flex-1 overflow-hidden custom-scrollbar"> 
      <Virtuoso
        data={allMessages}
        totalCount={allMessages.length}
        itemContent={(_, message) => (
          <MessageItem key={message.id} message={message} />
        )}
        followOutput={followOutput}
      />
    </div>
  );
};