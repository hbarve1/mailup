import React, { useState } from 'react';
import { Search, Plus, Settings, Moon, Sun, Pin, VolumeX } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useMail } from '../contexts/MailContext';
import AccountSwitcher from './AccountSwitcher';
import ConversationItem from './ConversationItem';

interface SidebarProps {
  selectedConversation: string | null;
  onConversationSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedConversation, onConversationSelect }) => {
  const { theme, toggleTheme } = useTheme();
  const { conversations, accounts, currentAccount } = useMail();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedConversations = filteredConversations.filter(conv => conv.pinned);
  const unpinnedConversations = filteredConversations.filter(conv => !conv.pinned);

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <AccountSwitcher />
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
              <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {/* Pinned Conversations */}
        {pinnedConversations.length > 0 && (
          <div>
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Pinned
            </div>
            {pinnedConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversation === conversation.id}
                onClick={() => onConversationSelect(conversation.id)}
              />
            ))}
            <div className="h-px bg-gray-200 dark:bg-gray-700 mx-4 my-2" />
          </div>
        )}

        {/* Regular Conversations */}
        {unpinnedConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedConversation === conversation.id}
            onClick={() => onConversationSelect(conversation.id)}
          />
        ))}
      </div>

      {/* New Message Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
          <Plus className="h-4 w-4" />
          New Message
        </button>
      </div>
    </div>
  );
};

export default Sidebar;