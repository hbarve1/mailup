import React from 'react';
import { Pin, VolumeX, Paperclip } from 'lucide-react';
import type { Conversation } from '../types';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  onClick
}) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
        isSelected ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500' : ''
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
        {conversation.sender.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className={`font-semibold text-sm truncate ${
            conversation.unread > 0 
              ? 'text-gray-900 dark:text-gray-100' 
              : 'text-gray-700 dark:text-gray-300'
          }`}>
            {conversation.sender}
          </h3>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            {conversation.pinned && (
              <Pin className="h-3 w-3 text-blue-500" />
            )}
            {conversation.muted && (
              <VolumeX className="h-3 w-3 text-gray-400" />
            )}
            <span className={`text-xs ${
              conversation.unread > 0 
                ? 'text-gray-900 dark:text-gray-100 font-medium' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {formatTime(conversation.lastMessage.timestamp)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {conversation.lastMessage.hasAttachment && (
              <Paperclip className="h-3 w-3 text-gray-400 flex-shrink-0" />
            )}
            <p className={`text-sm truncate ${
              conversation.unread > 0 
                ? 'text-gray-700 dark:text-gray-300 font-medium' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {conversation.subject}
            </p>
          </div>
          
          {conversation.unread > 0 && (
            <div className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium flex-shrink-0">
              {conversation.unread > 99 ? '99+' : conversation.unread}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;