import React, { useState } from 'react';
import { ChevronDown, Mail } from 'lucide-react';
import { useMail } from '../contexts/MailContext';

const AccountSwitcher: React.FC = () => {
  const { accounts, currentAccount, switchAccount } = useMail();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
          <Mail className="h-4 w-4 text-white" />
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {currentAccount.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {currentAccount.email}
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => {
                switchAccount(account.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                currentAccount.id === account.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {account.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {account.email}
                </div>
              </div>
              {account.unread > 0 && (
                <div className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {account.unread > 99 ? '99+' : account.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountSwitcher;