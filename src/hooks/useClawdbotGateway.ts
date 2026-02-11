"use client";

import { useState, useCallback, useRef, useEffect } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface UseClawdbotGatewayOptions {
  url?: string;
  autoConnect?: boolean;
}

export function useClawdbotGateway(options: UseClawdbotGatewayOptions = {}) {
  const { url = 'ws://localhost:19000', autoConnect = false } = options;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const messageIdRef = useRef(1);
  const currentMessageRef = useRef<string>('');

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      const ws = new WebSocket(url);
      
      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
        console.log('[Gateway] Connected');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Handle streaming responses
          if (data.method === 'agent.stream' || data.result?.streaming) {
            const content = data.params?.content || data.result?.content || '';
            currentMessageRef.current += content;
            
            setMessages(prev => {
              const lastMsg = prev[prev.length - 1];
              if (lastMsg?.isStreaming) {
                return [
                  ...prev.slice(0, -1),
                  { ...lastMsg, content: currentMessageRef.current }
                ];
              }
              return prev;
            });
          }
          
          // Handle completion
          if (data.result?.done || data.method === 'agent.complete') {
            setMessages(prev => {
              const lastMsg = prev[prev.length - 1];
              if (lastMsg?.isStreaming) {
                return [
                  ...prev.slice(0, -1),
                  { ...lastMsg, isStreaming: false, content: currentMessageRef.current || lastMsg.content }
                ];
              }
              return prev;
            });
            setIsGenerating(false);
            currentMessageRef.current = '';
          }
          
          // Handle errors
          if (data.error) {
            setError(data.error.message || 'Unknown error');
            setIsGenerating(false);
          }
        } catch (e) {
          console.error('[Gateway] Parse error:', e);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsGenerating(false);
        console.log('[Gateway] Disconnected');
      };

      ws.onerror = (e) => {
        setError('Connection failed');
        console.error('[Gateway] Error:', e);
      };

      wsRef.current = ws;
    } catch (e) {
      setError('Failed to connect');
      console.error('[Gateway] Connection error:', e);
    }
  }, [url]);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
    setIsConnected(false);
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setError('Not connected');
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    // Add placeholder for assistant response
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setIsGenerating(true);
    currentMessageRef.current = '';

    // Send via JSON-RPC
    const request = {
      jsonrpc: '2.0',
      method: 'agent.send',
      params: { message: content },
      id: messageIdRef.current++,
    };

    wsRef.current.send(JSON.stringify(request));
  }, []);

  const stopGeneration = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const request = {
      jsonrpc: '2.0',
      method: 'agent.abort',
      params: {},
      id: messageIdRef.current++,
    };

    wsRef.current.send(JSON.stringify(request));
    setIsGenerating(false);
    
    // Mark current message as complete
    setMessages(prev => {
      const lastMsg = prev[prev.length - 1];
      if (lastMsg?.isStreaming) {
        return [
          ...prev.slice(0, -1),
          { ...lastMsg, isStreaming: false, content: currentMessageRef.current || '(cancelled)' }
        ];
      }
      return prev;
    });
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    currentMessageRef.current = '';
  }, []);

  // Auto-connect if enabled
  useEffect(() => {
    if (autoConnect) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    messages,
    isConnected,
    isGenerating,
    error,
    connect,
    disconnect,
    sendMessage,
    stopGeneration,
    clearMessages,
  };
}
