import React from 'react';

import ConversationList from './ConversationList';
import MessageList from '../MessageList/MessageList';

const ChatWindow: React.FC = () => {
  return (
    <section className="chat-window h-full flex flex-col">
      <ConversationList />
      <div className="flex-1 flex flex-col">
        <MessageList />
        {/* MessageInput will go here */}
      </div>
    </section>
  );
};

export default ChatWindow;
