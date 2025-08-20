import React from 'react';
import { Zap } from 'lucide-react';

interface QuickRepliesProps {
  onReplySelect: (reply: string) => void;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ onReplySelect }) => {
  const quickReplies = [
    "Thanks!",
    "Got it, will review",
    "Let me check and get back to you",
    "Approved!",
    "Please send more details",
    "Schedule a meeting",
  ];

  return (
    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="h-4 w-4 text-blue-500" />
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Quick Replies (AI-Powered)
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            onClick={() => onReplySelect(reply)}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-200"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickReplies;