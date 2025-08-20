import React from 'react';

import MessageList from '../MessageList/MessageList';
import MessageInput from '../MessageInput/MessageInput';
import { useMailStore } from '../../store/mailStore';

const ChatWindow: React.FC = () => {
  // For now, use the first conversation as selected
  const conversations = useMailStore((state) => state.conversations);
  const users = useMailStore((state) => state.users);
  const selectedConversation = conversations[0];
  const selectedConversationId = selectedConversation?.id;
  const participant = selectedConversation ? users.find(u => u.id === selectedConversation.participants.find(pid => pid !== users[0].id)) : null;

  return (
    <section className="chat-window flex flex-col w-full h-full">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full bg-chat bg-cover bg-no-repeat relative">
        {/* Chat header */}
        {selectedConversation && (
          <header className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            {participant && (
              <img src={participant.avatar} alt={participant.name} className="w-10 h-10 rounded-full object-cover" />
            )}
            <div>
              <div className="font-semibold text-gray-800">{participant?.name || 'Select a conversation'}</div>
              <div className="text-xs text-gray-500">{selectedConversation.subject}</div>
            </div>
            <span className="ml-auto text-xs text-gray-400">{selectedConversation.lastMessage}</span>
          </header>
        )}
        <div className="flex-1 flex flex-col h-full">
          <MessageList conversationId={selectedConversationId} />
          <MessageInput conversationId={selectedConversationId} />
        </div>
      </div>
    </section>
  );
};

export default ChatWindow;
