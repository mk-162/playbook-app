"use client";

import { useEffect, useRef } from 'react';
import { useClawdbotGateway } from '@/hooks/useClawdbotGateway';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    isConnected,
    isGenerating,
    error,
    connect,
    disconnect,
    sendMessage,
    stopGeneration,
    clearMessages,
  } = useClawdbotGateway({ autoConnect: false });

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Connect when panel opens
  useEffect(() => {
    if (isOpen && !isConnected) {
      connect();
    }
  }, [isOpen, isConnected, connect]);

  if (!isOpen) return null;

  return (
    <div className="w-[350px] h-full flex flex-col bg-[--color-card] border-l border-[--color-border] shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[--color-border]">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="font-medium text-sm">G-Bot</span>
          {isGenerating && (
            <span className="text-[10px] text-[--color-text-muted] animate-pulse">thinking...</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="p-1.5 rounded-lg hover:bg-[--color-surface] transition-colors"
              title="Clear chat"
            >
              <span className="material-symbols-outlined text-lg text-[--color-text-muted]">delete</span>
            </button>
          )}
          <button
            onClick={isConnected ? disconnect : connect}
            className="p-1.5 rounded-lg hover:bg-[--color-surface] transition-colors"
            title={isConnected ? 'Disconnect' : 'Connect'}
          >
            <span className={`material-symbols-outlined text-lg ${isConnected ? 'text-green-500' : 'text-[--color-text-muted]'}`}>
              {isConnected ? 'link' : 'link_off'}
            </span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[--color-surface] transition-colors"
            title="Close chat"
          >
            <span className="material-symbols-outlined text-lg text-[--color-text-muted]">close</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <span className="material-symbols-outlined text-4xl text-[--color-text-muted] mb-3">
              smart_toy
            </span>
            <h3 className="font-medium text-[--color-text-primary] mb-1">G-Bot Assistant</h3>
            <p className="text-sm text-[--color-text-muted]">
              Ask me anything about your playbook, tasks, or workflows.
            </p>
            {!isConnected && (
              <button
                onClick={connect}
                className="mt-4 px-4 py-2 rounded-lg bg-[--color-primary] text-white text-sm
                         hover:bg-[--color-primary-hover] transition-colors"
              >
                Connect to Gateway
              </button>
            )}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20">
          <p className="text-xs text-red-400 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </p>
        </div>
      )}

      {/* Input */}
      <ChatInput
        onSend={sendMessage}
        onStop={stopGeneration}
        isGenerating={isGenerating}
        disabled={!isConnected}
      />
    </div>
  );
}
