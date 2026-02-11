"use client";

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, onStop, isGenerating, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !disabled && !isGenerating) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-[--color-border] bg-[--color-card] p-3">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message G-Bot..."
            disabled={disabled || isGenerating}
            rows={1}
            className="w-full resize-none rounded-xl bg-[--color-surface] border border-[--color-border] 
                     px-4 py-2.5 text-sm text-[--color-text-primary] placeholder-[--color-text-muted]
                     focus:outline-none focus:border-[--color-primary] focus:ring-1 focus:ring-[--color-primary]/20
                     disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        
        {isGenerating ? (
          <button
            onClick={onStop}
            className="shrink-0 w-10 h-10 rounded-xl bg-red-500/20 text-red-400 
                     hover:bg-red-500/30 transition-colors flex items-center justify-center"
            title="Stop generating"
          >
            <span className="material-symbols-outlined text-xl">stop</span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            className="shrink-0 w-10 h-10 rounded-xl bg-[--color-primary] text-white 
                     hover:bg-[--color-primary-hover] transition-colors flex items-center justify-center
                     disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send message"
          >
            <span className="material-symbols-outlined text-xl">send</span>
          </button>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-2 px-1">
        <span className="text-[10px] text-[--color-text-muted]">
          Shift+Enter for new line
        </span>
        <button
          className="text-[10px] text-[--color-text-muted] hover:text-[--color-primary] transition-colors
                   flex items-center gap-1"
          title="Flag this conversation for human review"
        >
          <span className="material-symbols-outlined text-sm">flag</span>
          Flag to Human
        </button>
      </div>
    </div>
  );
}
