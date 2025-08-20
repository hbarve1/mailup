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
  { id: 'u4', name: 'David', email: 'david@hotmail.com', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 'u5', name: 'Eva', email: 'eva@gmail.com', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 'u6', name: 'Frank', email: 'frank@outlook.com', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: 'u7', name: 'Grace', email: 'grace@yahoo.com', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: 'u8', name: 'Henry', email: 'henry@hotmail.com', avatar: 'https://i.pravatar.cc/150?img=8' }
];

export const sampleConversations: Conversation[] = [
  { id: 'c1', integrationId: 'gmail', participants: ['u1', 'u2'], subject: 'Project Update', lastMessage: 'See you at 3pm.' },
  { id: 'c2', integrationId: 'outlook', participants: ['u2', 'u3'], subject: 'Invoice', lastMessage: 'Invoice attached.' },
  { id: 'c3', integrationId: 'yahoo', participants: ['u1', 'u3'], subject: 'Party', lastMessage: 'Don’t forget the snacks!' },
  { id: 'c4', integrationId: 'gmail', participants: ['u1', 'u5'], subject: 'Welcome Eva', lastMessage: 'Welcome to the team, Eva!' },
  { id: 'c5', integrationId: 'hotmail', participants: ['u4', 'u8'], subject: 'Support', lastMessage: 'I will check and update you.' },
  { id: 'c6', integrationId: 'outlook', participants: ['u2', 'u6'], subject: 'Deployment', lastMessage: 'Deployment is scheduled for Friday.' },
  { id: 'c7', integrationId: 'yahoo', participants: ['u3', 'u7'], subject: 'Birthday', lastMessage: 'Happy Birthday, Grace!' },
];

export const sampleMessages: Message[] = [
  { id: 'm1', conversationId: 'c1', senderId: 'u1', content: 'Hey Bob, are you coming to the meeting?', timestamp: '2025-08-20T09:00:00Z' },
  { id: 'm2', conversationId: 'c1', senderId: 'u2', content: 'Yes, see you at 3pm.', timestamp: '2025-08-20T09:05:00Z' },
  { id: 'm3', conversationId: 'c2', senderId: 'u2', content: 'Invoice attached.', timestamp: '2025-08-20T10:00:00Z' },
  { id: 'm4', conversationId: 'c2', senderId: 'u3', content: 'Thanks, Bob!', timestamp: '2025-08-20T10:10:00Z' },
  { id: 'm5', conversationId: 'c3', senderId: 'u1', content: 'Don’t forget the snacks!', timestamp: '2025-08-20T11:00:00Z' },
  { id: 'm6', conversationId: 'c4', senderId: 'u1', content: 'Welcome to the team, Eva!', timestamp: '2025-08-20T12:00:00Z' },
  { id: 'm7', conversationId: 'c4', senderId: 'u5', content: 'Thank you, Alice! Excited to join.', timestamp: '2025-08-20T12:05:00Z' },
  { id: 'm8', conversationId: 'c5', senderId: 'u4', content: 'I will check and update you.', timestamp: '2025-08-20T13:00:00Z' },
  { id: 'm9', conversationId: 'c5', senderId: 'u8', content: 'Thanks, David!', timestamp: '2025-08-20T13:10:00Z' },
  { id: 'm10', conversationId: 'c6', senderId: 'u2', content: 'Deployment is scheduled for Friday.', timestamp: '2025-08-20T14:00:00Z' },
  { id: 'm11', conversationId: 'c6', senderId: 'u6', content: 'Great, I will prepare the release notes.', timestamp: '2025-08-20T14:10:00Z' },
  { id: 'm12', conversationId: 'c7', senderId: 'u3', content: 'Happy Birthday, Grace!', timestamp: '2025-08-20T15:00:00Z' },
  { id: 'm13', conversationId: 'c7', senderId: 'u7', content: 'Thank you, Charlie!', timestamp: '2025-08-20T15:05:00Z' },
];
