import React from 'react';
import { useMailStore } from '../../store/mailStore';

const ConversationList: React.FC = () => {
  const conversations = useMailStore((state) => state.conversations);
  const integrations = useMailStore((state) => state.integrations);

  const getIntegrationIcon = (integrationId: string) => {
    const integration = integrations.find((i) => i.id === integrationId);
    return integration ? integration.icon : '';
  };

  return (
    <div className="conversation-list p-4 border-b border-gray-200">
      <h3 className="text-md font-semibold mb-3 text-gray-700">Conversations</h3>
      <ul className="space-y-2">
        {conversations.map((conv) => (
          <li
            key={conv.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
          >
            <span className="text-xl">{getIntegrationIcon(conv.integrationId)}</span>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{conv.subject}</span>
              <span className="text-xs text-gray-500 truncate max-w-xs">{conv.lastMessage}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
