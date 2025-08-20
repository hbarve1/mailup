import React, { createContext, useContext, useState } from 'react';
import type { Account, Conversation, Message } from '../types/index';
import { mockAccounts, mockConversations, mockMessages } from '../data/mockData';

interface MailContextType {
  accounts: Account[];
  currentAccount: Account;
  conversations: Conversation[];
  messages: Message[];
  switchAccount: (accountId: string) => void;
}

const MailContext = createContext<MailContextType | undefined>(undefined);

export const MailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts] = useState<Account[]>(mockAccounts);
  const [currentAccount, setCurrentAccount] = useState<Account>(mockAccounts[0]);
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [messages] = useState<Message[]>(mockMessages);

  const switchAccount = (accountId: string) => {
    const account = accounts.find(a => a.id === accountId);
    if (account) {
      setCurrentAccount(account);
    }
  };

  return (
    <MailContext.Provider value={{
      accounts,
      currentAccount,
      conversations,
      messages,
      switchAccount,
    }}>
      {children}
    </MailContext.Provider>
  );
};

export const useMail = () => {
  const context = useContext(MailContext);
  if (context === undefined) {
    throw new Error('useMail must be used within a MailProvider');
  }
  return context;
};