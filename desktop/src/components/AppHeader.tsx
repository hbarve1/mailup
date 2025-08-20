import React from 'react';
import { useMailStore } from '../store/mailStore';

const AppHeader: React.FC = () => {
  const currentUserId = useMailStore((state) => state.currentUserId);
  const user = useMailStore((state) => state.users.find(u => u.id === currentUserId));
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-white/80 border-b border-gray-200 shadow-sm z-40">
      <span className="text-2xl font-bold text-green-700 tracking-tight">MailUp</span>
      {user && (
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-green-200" />
          <div className="flex flex-col text-right">
            <span className="font-semibold text-gray-800 text-sm">{user.name}</span>
            <span className="text-xs text-green-600">{user.email}</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
