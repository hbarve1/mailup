
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';

const contacts = [
  { id: 1, name: 'Alice', lastMessage: 'See you soon!' },
  { id: 2, name: 'Bob', lastMessage: 'How are you?' },
  { id: 3, name: 'Charlie', lastMessage: 'Let’s catch up.' },
];

const initialMessages = [
  { from: 'Alice', text: 'Hey there!' },
  { from: 'me', text: 'Hi Alice!' },
  { from: 'Alice', text: 'See you soon!' },
];

function App() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setMessages([...messages, { from: 'me', text: input }]);
    setInput('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar contacts={contacts} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
      <div className="flex-1 flex flex-col">
        <ChatHeader contact={selectedContact} />
        <ChatMessages messages={messages} />
        <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
