import React from 'react';
import { useMail } from '../contexts/MailContext';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ReplyBox from './ReplyBox';

interface ChatViewProps {
  conversationId: string | null;
}

const ChatView: React.FC<ChatViewProps> = ({ conversationId }) => {
  const { conversations, messages } = useMail();
  
  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Welcome to Mail Chat
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  const conversation = conversations.find(c => c.id === conversationId);
  const conversationMessages = messages.filter(m => m.conversationId === conversationId);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Conversation not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
      <ChatHeader conversation={conversation} />
      <MessageList messages={conversationMessages} />
      <ReplyBox conversationId={conversationId} />
    </div>
  );
};

export default ChatView;