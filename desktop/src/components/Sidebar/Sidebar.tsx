import React from 'react';

import ConversationList from '../ChatWindow/ConversationList';


interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <aside
      className={`sidebar fixed md:static z-30 bg-white border-r border-gray-200 w-64 h-full flex flex-col shadow-sm transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      {/* Close button for mobile */}
      <button
        className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        ×
      </button>
      <div className="flex-1 overflow-y-auto">
        <ConversationList />
      </div>
    </aside>
  );
};

export default Sidebar;
