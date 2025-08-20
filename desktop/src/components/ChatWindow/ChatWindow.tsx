import React from 'react';

import ConversationList from './ConversationList';
import MessageList from '../MessageList/MessageList';
import MessageInput from '../MessageInput/MessageInput';
import { useMailStore } from '../../store/mailStore';

const ChatWindow: React.FC = () => {
  // For now, use the first conversation as selected
  const conversations = useMailStore((state) => state.conversations);
  const selectedConversationId = conversations[0]?.id;

  return (
    <section className="chat-window h-full flex flex-col bg-gray-50 rounded-lg shadow-md mx-auto my-6 max-w-3xl border border-gray-200">
      {/* Chat header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-white rounded-t-lg">
        <span className="text-2xl font-bold text-blue-600">MailUp</span>
        <span className="ml-auto text-xs text-gray-400">Slack/WhatsApp Style</span>
      </header>
      <div className="flex h-full">
        {/* Conversation list sidebar */}
        <aside className="w-72 border-r border-gray-200 bg-white h-full overflow-y-auto rounded-bl-lg">
          <ConversationList />
        </aside>
        {/* Main chat area */}
        <div className="flex-1 flex flex-col h-full">
          <MessageList conversationId={selectedConversationId} />
          <MessageInput conversationId={selectedConversationId} />
        </div>
      </div>
    </section>
  );
};

export default ChatWindow;
