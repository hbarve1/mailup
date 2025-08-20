// ChatMessages component for displaying messages
export default function ChatMessages({ messages }) {
  return (
    <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-xs px-4 py-2 rounded-lg ${msg.from === 'me' ? 'bg-green-200 self-end' : 'bg-white self-start border'}`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
