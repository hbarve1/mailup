import React, { useState, useRef } from 'react';
import { Send, Paperclip, Smile, Bold, Italic, Underline } from 'lucide-react';
import QuickReplies from './QuickReplies';

interface ReplyBoxProps {
  conversationId: string;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ conversationId }) => {
  const [message, setMessage] = useState('');
  const [showFormatting, setShowFormatting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      // Here you would integrate with your mail API
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
    textareaRef.current?.focus();
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      {/* Quick Replies */}
      <QuickReplies onReplySelect={handleQuickReply} />
      
      <div className="p-4">
        {/* Formatting Toolbar */}
        {showFormatting && (
          <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-gray-700 mb-3">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <Bold className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <Italic className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <Underline className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        )}

        {/* Message Input */}
        <div className="flex items-end gap-3">
          {/* Attachment Button */}
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 flex-shrink-0"
          >
            <Paperclip className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              console.log('Files selected:', e.target.files);
              // Handle file attachments
            }}
          />

          {/* Text Input Container */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTextareaResize();
              }}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-200"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            
            {/* Emoji Button */}
            <button 
              onClick={() => setShowFormatting(!showFormatting)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
            >
              <Smile className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
              message.trim()
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyBox;