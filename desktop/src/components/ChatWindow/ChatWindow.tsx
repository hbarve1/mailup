import React from 'react';
import ConversationList from './ConversationList';

const ChatWindow: React.FC = () => {
  return (
    <section className="chat-window h-full flex flex-col">
      <ConversationList />
      {/* MessageList and MessageInput will go here */}
    </section>
  );
};

export default ChatWindow;
