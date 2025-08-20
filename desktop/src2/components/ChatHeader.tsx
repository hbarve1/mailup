import React from 'react';
import { Search, Pin, VolumeX, Archive, MoreHorizontal, Phone, Video } from 'lucide-react';
import type { Conversation } from '../types';

interface ChatHeaderProps {
  conversation: Conversation;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ conversation }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {conversation.sender.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          
          {/* Contact Info */}
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              {conversation.sender}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>last seen recently</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <button className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 ${
            conversation.pinned ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'
          }`}>
            <Pin className="h-5 w-5" />
          </button>
          
          <button className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 ${
            conversation.muted ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
          }`}>
            <VolumeX className="h-5 w-5" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <Archive className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
          
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <Video className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <MoreHorizontal className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;