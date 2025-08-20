import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import { ThemeProvider } from './context/ThemeContext';
import { MailProvider } from './context/MailContext';
import './App.css';

function App() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');

  return (
    <ThemeProvider>
      <MailProvider>
        <div className="flex h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Sidebar 
            selectedConversation={selectedConversation}
            onConversationSelect={setSelectedConversation}
          />
          <ChatView conversationId={selectedConversation} />
        </div>
      </MailProvider>
    </ThemeProvider>
  );
}

export default App;