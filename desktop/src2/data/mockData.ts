import type { Account, Conversation, Message } from '../types/index';

export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Work Account',
    email: 'john.doe@company.com',
    unread: 5,
  },
  {
    id: '2',
    name: 'Personal',
    email: 'john.personal@gmail.com',
    unread: 2,
  },
  {
    id: '3',
    name: 'Freelance',
    email: 'john.freelance@outlook.com',
    unread: 0,
  },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    sender: 'Sarah Wilson',
    subject: 'Project Update - Q4 Planning',
    lastMessage: {
      content: 'Thanks for the update! The new timeline looks good to me.',
      timestamp: '2024-01-15T10:30:00Z',
      hasAttachment: false,
    },
    unread: 2,
    pinned: true,
    muted: false,
  },
  {
    id: '2',
    sender: 'Marketing Team',
    subject: 'Campaign Results & Analytics',
    lastMessage: {
      content: 'Please find attached the performance report for last month',
      timestamp: '2024-01-15T09:15:00Z',
      hasAttachment: true,
    },
    unread: 1,
    pinned: true,
    muted: false,
  },
  {
    id: '3',
    sender: 'Alex Chen',
    subject: 'Code Review Request',
    lastMessage: {
      content: 'Could you please review the authentication module?',
      timestamp: '2024-01-14T16:45:00Z',
      hasAttachment: false,
    },
    unread: 0,
    pinned: false,
    muted: false,
  },
  {
    id: '4',
    sender: 'HR Department',
    subject: 'Annual Performance Review',
    lastMessage: {
      content: 'Your performance review has been scheduled for next week',
      timestamp: '2024-01-14T14:20:00Z',
      hasAttachment: true,
    },
    unread: 0,
    pinned: false,
    muted: true,
  },
  {
    id: '5',
    sender: 'Client Support',
    subject: 'Customer Feedback Summary',
    lastMessage: {
      content: 'Overall satisfaction rating has improved by 15% this quarter',
      timestamp: '2024-01-14T11:30:00Z',
      hasAttachment: false,
    },
    unread: 0,
    pinned: false,
    muted: false,
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    conversationId: '1',
    sender: 'Sarah Wilson',
    content: 'Hi there! I wanted to update you on our Q4 planning progress. We\'ve made some significant strides in the past week.',
    timestamp: '2024-01-14T09:00:00Z',
    fromMe: false,
    isRead: true,
    isThreadStart: true,
    subject: 'Project Update - Q4 Planning',
  },
  {
    id: '2',
    conversationId: '1',
    sender: 'John Doe',
    content: 'That\'s great to hear! Could you share more details about the timeline adjustments?',
    timestamp: '2024-01-14T09:15:00Z',
    fromMe: true,
    isRead: true,
  },
  {
    id: '3',
    conversationId: '1',
    sender: 'Sarah Wilson',
    content: 'Of course! Here\'s the updated project timeline. We\'ve managed to accelerate the development phase by two weeks, which gives us more buffer time for testing.',
    timestamp: '2024-01-14T10:30:00Z',
    fromMe: false,
    isRead: true,
    attachments: [
      {
        id: '1',
        name: 'Q4_Timeline_Updated.pdf',
        type: 'pdf',
        size: '2.3 MB',
        url: 'https://example.com/timeline.pdf',
      }
    ],
  },
  {
    id: '4',
    conversationId: '1',
    sender: 'John Doe',
    content: 'Perfect! This looks much more manageable. I especially like how you\'ve structured the testing phases.',
    timestamp: '2024-01-15T08:45:00Z',
    fromMe: true,
    isRead: true,
    quotedMessage: {
      sender: 'Sarah Wilson',
      content: 'Here\'s the updated project timeline. We\'ve managed to accelerate the development phase...'
    }
  },
  {
    id: '5',
    conversationId: '1',
    sender: 'Sarah Wilson',
    content: 'Thanks for the feedback! The new timeline should help us deliver a more polished product. Let me know if you have any concerns.',
    timestamp: '2024-01-15T10:30:00Z',
    fromMe: false,
    isRead: false,
  },
  {
    id: '6',
    conversationId: '2',
    sender: 'Marketing Team',
    content: 'Here are the campaign results for December. Overall performance exceeded expectations!',
    timestamp: '2024-01-15T09:15:00Z',
    fromMe: false,
    isRead: false,
    isThreadStart: true,
    subject: 'Campaign Results & Analytics',
    attachments: [
      {
        id: '2',
        name: 'Campaign_Performance_Dec.xlsx',
        type: 'document',
        size: '1.8 MB',
        url: 'https://example.com/campaign.xlsx',
      },
      {
        id: '3',
        name: 'Social_Media_Stats.png',
        type: 'image',
        size: '456 KB',
        url: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      }
    ],
  },
];