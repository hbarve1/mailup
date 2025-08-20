// ChatInput component for sending messages
import { useRef } from 'react';

export default function ChatInput({ input, setInput, sendMessage }) {
  const inputRef = useRef(null);
  return (
    <form onSubmit={sendMessage} className="p-4 bg-white border-t flex gap-2">
      <input
        ref={inputRef}
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring"
        type="text"
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">Send</button>
    </form>
  );
}
