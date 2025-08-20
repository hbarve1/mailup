// Types for mail integrations, users, messages, and conversations


export type MailIntegration = {
  id: string;
  name: string;
  icon: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  integrationId: string;
  participants: string[];
  subject: string;
  lastMessage: string;
};

// Store state type
export interface MailState {
  integrations: MailIntegration[];
  users: User[];
  conversations: Conversation[];
  messages: Message[];
  currentUserId: string;
  selectedIntegrationId: string | null;
  setSelectedIntegration: (id: string) => void;
  setCurrentUserId: (id: string) => void;
  addMessage: (msg: Message) => void;
}
