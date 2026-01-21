import { useState, type FormEvent } from 'react';

interface ChatInputProps {
  onGenerate: (text: string) => void;
  onStop: () => void;
  isGenerating: boolean;
}

export const ChatInput = ({ onGenerate, onStop, isGenerating }: ChatInputProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onGenerate(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        type="text"
        className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Введите сообщение..."
        disabled={isGenerating}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {isGenerating ? (
        <button
          onClick={onStop}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 flex items-center gap-2"
        >
          Stop <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        </button>
      ) : (
        <button type="submit" disabled={!text.trim()} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-500">Generate</button>
      )}
    </form>
  );
};
