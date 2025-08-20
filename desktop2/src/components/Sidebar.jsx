// Sidebar component for chat contacts
export default function Sidebar({ contacts, selectedContact, setSelectedContact }) {
  return (
    <div className="w-1/4 bg-white border-r flex flex-col">
      <div className="p-4 font-bold text-lg border-b">Chats</div>
      <ul className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className={`p-4 cursor-pointer hover:bg-gray-200 ${selectedContact.id === contact.id ? 'bg-gray-200' : ''}`}
            onClick={() => setSelectedContact(contact)}
          >
            <div className="font-semibold">{contact.name}</div>
            <div className="text-sm text-gray-500 truncate">{contact.lastMessage}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
