import React from 'react';

import MailIntegrationList from './MailIntegrationList';
import { useMailStore } from '../../store/mailStore';


interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const currentUserId = useMailStore((state) => state.currentUserId);
  const user = useMailStore((state) => state.users.find(u => u.id === currentUserId));
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
      {user && (
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="font-semibold text-gray-800">{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </div>
      )}
      <MailIntegrationList />
    </aside>
  );
};

export default Sidebar;
