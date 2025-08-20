import React, { useState } from 'react';
import { Download, FileText, Image, Eye, Reply, Forward } from 'lucide-react';
import type { Message, Attachment } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [showActions, setShowActions] = useState(false);
  const isFromMe = message.fromMe;

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderAttachment = (attachment: Attachment) => {
    const iconMap = {
      image: Image,
      pdf: FileText,
      document: FileText,
    };
    const Icon = iconMap[attachment.type] || FileText;

    return (
      <div key={attachment.id} className="mt-2">
        {attachment.type === 'image' ? (
          <div className="relative group">
            <img 
              src={attachment.url} 
              alt={attachment.name}
              className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(attachment.url)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
              <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg max-w-xs">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {attachment.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {attachment.size}
              </p>
            </div>
            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
              <Download className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`flex ${isFromMe ? 'justify-end' : 'justify-start'} group`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-end gap-2 max-w-lg">
        {!isFromMe && (
          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
            {message.sender.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
        )}
        
        <div className="flex flex-col">
          {/* Quoted Reply */}
          {message.quotedMessage && (
            <div className={`mb-1 p-2 border-l-4 ${
              isFromMe 
                ? 'border-white/30 bg-white/10' 
                : 'border-blue-500 bg-gray-100 dark:bg-gray-700'
            } rounded text-sm`}>
              <p className="font-semibold text-xs opacity-75 mb-1">
                {message.quotedMessage.sender}
              </p>
              <p className="opacity-75 text-xs">
                {message.quotedMessage.content}
              </p>
            </div>
          )}

          {/* Main Message */}
          <div className={`p-3 rounded-lg shadow-sm ${
            isFromMe 
              ? 'bg-blue-500 text-white' 
              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
          }`}>
            {/* Subject line for first message in thread */}
            {message.isThreadStart && (
              <div className={`text-xs font-semibold mb-2 pb-2 border-b ${
                isFromMe 
                  ? 'border-white/20 text-white/80' 
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'
              }`}>
                {message.subject}
              </div>
            )}
            
            <p className="whitespace-pre-wrap">{message.content}</p>
            
            {/* Attachments */}
            {message.attachments && message.attachments.map(renderAttachment)}
            
            {/* Timestamp */}
            <div className={`text-xs mt-2 ${
              isFromMe ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {formatTime(message.timestamp)}
              {message.isRead && isFromMe && (
                <span className="ml-1">✓✓</span>
              )}
            </div>
          </div>
        </div>

        {/* Message Actions */}
        {showActions && (
          <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500 dark:text-gray-400">
              <Reply className="h-4 w-4" />
            </button>
            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500 dark:text-gray-400">
              <Forward className="h-4 w-4" />
            </button>
          </div>
        )}
        
        {isFromMe && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
            ME
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;