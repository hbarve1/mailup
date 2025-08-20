import React from 'react';
import { useMailStore } from '../../store/mailStore';

const MessageList: React.FC<{ conversationId?: string }> = ({ conversationId }) => {
  const messages = useMailStore((state) => state.messages);
  const users = useMailStore((state) => state.users);

  // For now, show messages from the first conversation if none selected
  const filteredMessages = messages.filter(
    (msg) => msg.conversationId === (conversationId || (messages[0]?.conversationId ?? ''))
  );

  const getUser = (userId: string) => users.find((u) => u.id === userId);

  return (
    <div className="message-list flex-1 overflow-y-auto p-4 bg-white">
      <ul className="space-y-4">
        {filteredMessages.map((msg) => {
          const user = getUser(msg.senderId);
          return (
            <li key={msg.id} className="flex items-start gap-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-semibold text-gray-700">{user?.name}</div>
                <div className="text-gray-800">{msg.content}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleString()}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MessageList;
