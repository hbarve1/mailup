// Dummy data for mail integrations, users, conversations, and messages

import type { User, MailIntegration, Conversation, Message } from './types';

export const sampleIntegrations: MailIntegration[] = [
  { id: 'gmail', name: 'Gmail', icon: '📧' },
  { id: 'outlook', name: 'Outlook', icon: '📨' },
  { id: 'yahoo', name: 'Yahoo', icon: '✉️' },
  { id: 'hotmail', name: 'Hotmail', icon: '✉️' },
];

export const sampleUsers: User[] = [
  { id: 'u1', name: 'Alice', email: 'alice@gmail.com', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 'u2', name: 'Bob', email: 'bob@outlook.com', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 'u3', name: 'Charlie', email: 'charlie@yahoo.com', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 'u4', name: 'David', email: 'david@hotmail.com', avatar: 'https://i.pravatar.cc/150?img=4' }
];

export const sampleConversations: Conversation[] = [
  { id: 'c1', integrationId: 'gmail', participants: ['u1', 'u2'], subject: 'Project Update', lastMessage: 'See you at 3pm.' },
  { id: 'c2', integrationId: 'outlook', participants: ['u2', 'u3'], subject: 'Invoice', lastMessage: 'Invoice attached.' },
  { id: 'c3', integrationId: 'yahoo', participants: ['u1', 'u3'], subject: 'Party', lastMessage: 'Don’t forget the snacks!' },
];

export const sampleMessages: Message[] = [
  { id: 'm1', conversationId: 'c1', senderId: 'u1', content: 'Hey Bob, are you coming to the meeting?', timestamp: '2025-08-20T09:00:00Z' },
  { id: 'm2', conversationId: 'c1', senderId: 'u2', content: 'Yes, see you at 3pm.', timestamp: '2025-08-20T09:05:00Z' },
  { id: 'm3', conversationId: 'c2', senderId: 'u2', content: 'Invoice attached.', timestamp: '2025-08-20T10:00:00Z' },
  { id: 'm4', conversationId: 'c2', senderId: 'u3', content: 'Thanks, Bob!', timestamp: '2025-08-20T10:10:00Z' },
  { id: 'm5', conversationId: 'c3', senderId: 'u1', content: 'Don’t forget the snacks!', timestamp: '2025-08-20T11:00:00Z' },
];
