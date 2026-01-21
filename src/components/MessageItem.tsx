import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import type{ Message } from '../types/types';

interface MessageItemProps {
  message: Message;
}

const MessageItemComponent = ({ message }: MessageItemProps) => {
  const isUser = message.role === 'user';
  const messageClass = isUser ? 'bg-blue-600 self-end' : 'bg-gray-600 self-start';

  return (
    <div className={`max-w-5/6 p-3 rounded-lg my-2 ${messageClass} prose prose-invert`}> 
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
      {message.isStreaming && <span className="animate-pulse">_</span>} 
    </div>
  );
};

export const MessageItem = memo(MessageItemComponent);