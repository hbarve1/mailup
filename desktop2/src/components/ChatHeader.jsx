// ChatHeader component for the chat area
export default function ChatHeader({ contact }) {
  return (
    <div className="p-4 border-b bg-white flex items-center">
      <div className="font-semibold text-lg">{contact.name}</div>
    </div>
  );
}
