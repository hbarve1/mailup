import React, { useState } from 'react';
import { useMailStore } from '../../store/mailStore';

const MessageInput: React.FC<{ conversationId?: string }> = ({ conversationId }) => {
  const [input, setInput] = useState('');
  const addMessage = useMailStore((state) => state.addMessage);
  const users = useMailStore((state) => state.users);

  // For demo, always use the first user as sender
  const currentUser = users[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !conversationId) return;
    addMessage({
      id: 'm' + Date.now(),
      conversationId,
      senderId: currentUser.id,
      content: input,
      timestamp: new Date().toISOString(),
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSend} className="flex items-center gap-2 p-4 border-t bg-white">
      <input
        className="flex-1 rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={!conversationId}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        disabled={!input.trim() || !conversationId}
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
