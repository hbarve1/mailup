export interface Account {
  id: string;
  name: string;
  email: string;
  unread: number;
}

export interface Conversation {
  id: string;
  sender: string;
  subject: string;
  lastMessage: {
    content: string;
    timestamp: string;
    hasAttachment: boolean;
  };
  unread: number;
  pinned: boolean;
  muted: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'document';
  size: string;
  url: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: string;
  content: string;
  timestamp: string;
  fromMe: boolean;
  isRead: boolean;
  isThreadStart?: boolean;
  subject?: string;
  attachments?: Attachment[];
  quotedMessage?: {
    sender: string;
    content: string;
  };
}