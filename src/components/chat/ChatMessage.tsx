"use client";

import { Message } from '@/hooks/useClawdbotGateway';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
          isUser
            ? 'bg-[--color-primary] text-white rounded-br-md'
            : 'bg-[--color-surface-raised] text-[--color-text-primary] rounded-bl-md'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap break-words">
          {message.content}
          {message.isStreaming && (
            <span className="inline-block w-1.5 h-4 ml-1 bg-current animate-pulse rounded-sm" />
          )}
        </div>
        <div
          className={`text-[10px] mt-1 ${
            isUser ? 'text-white/60' : 'text-[--color-text-muted]'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
