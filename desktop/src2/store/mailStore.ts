
import { create } from 'zustand';
import type { Message, MailState } from './types';
import {
  sampleIntegrations,
  sampleUsers,
  sampleConversations,
  sampleMessages,
} from './data';

export const useMailStore = create<MailState>((set, get) => ({
  integrations: sampleIntegrations,
  users: sampleUsers,
  conversations: sampleConversations,
  messages: sampleMessages,
  currentUserId: sampleUsers[0].id, // Assume Alice is logged in
  selectedIntegrationId: null,
  setSelectedIntegration: (id: string) => {
    set({ selectedIntegrationId: id });
    // Set current user to the first user with this integration
    const user = get().users.find((u) => u.email.toLowerCase().includes(id));
    if (user) set({ currentUserId: user.id });
  },
  setCurrentUserId: (id: string) => set({ currentUserId: id }),
  addMessage: (msg: Message) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),
}));
