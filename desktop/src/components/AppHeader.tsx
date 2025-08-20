import React, { useState, useRef, useEffect } from 'react';
import { useMailStore } from '../store/mailStore';

const AppHeader: React.FC = () => {
  const currentUserId = useMailStore((state) => state.currentUserId);
  const user = useMailStore((state) => state.users.find(u => u.id === currentUserId));
  const integrations = useMailStore((state) => state.integrations);
  const users = useMailStore((state) => state.users);
  const setSelectedIntegration = useMailStore((state) => state.setSelectedIntegration);
  const setCurrentUserId = useMailStore((state) => state.setCurrentUserId);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Find all user accounts grouped by integration
  const accountsByIntegration = integrations.map(integration => ({
    ...integration,
    users: users.filter(u => u.email.toLowerCase().includes(integration.id))
  }));

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-white/80 border-b border-gray-200 shadow-sm z-40">
      <span className="text-2xl font-bold text-green-700 tracking-tight">MailUp</span>
      {user && (
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-3 focus:outline-none"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-green-200" />
            <div className="flex flex-col text-right">
              <span className="font-semibold text-gray-800 text-sm">{user.name}</span>
              <span className="text-xs text-green-600">{user.email}</span>
            </div>
            <svg className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2">
              <div className="px-3 py-2 border-b border-gray-100 text-xs text-gray-500 font-semibold">Account</div>
              <div className="px-3 py-2 hover:bg-gray-50 rounded cursor-pointer text-sm" onClick={() => { setDropdownOpen(false); alert('Settings coming soon!'); }}>Settings</div>
              <div className="px-3 py-2 border-b border-gray-100 text-xs text-gray-500 font-semibold">Switch Account</div>
              {accountsByIntegration.map(integration => (
                <div key={integration.id} className="mb-1">
                  <div className="flex items-center gap-2 px-3 py-1 text-xs text-gray-700 font-medium">
                    <span className="text-lg">{integration.icon}</span>
                    {integration.name}
                  </div>
                  {integration.users.length === 0 && (
                    <div className="px-6 py-1 text-xs text-gray-400">No accounts</div>
                  )}
                  {integration.users.map(acc => (
                    <div
                      key={acc.id}
                      className={`flex items-center gap-2 px-6 py-1 rounded cursor-pointer hover:bg-green-50 ${acc.id === currentUserId ? 'bg-green-100 font-bold text-green-700' : ''}`}
                      onClick={() => {
                        setSelectedIntegration(integration.id);
                        setCurrentUserId(acc.id);
                        setDropdownOpen(false);
                      }}
                    >
                      <img src={acc.avatar} alt={acc.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs">{acc.name}</span>
                      <span className="text-xs text-gray-400">{acc.email}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default AppHeader;
