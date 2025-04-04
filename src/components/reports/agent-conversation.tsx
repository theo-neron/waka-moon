'use client'

import React, { useState, useRef, useEffect } from 'react';
import { AgentType, AgentConversation, AgentMessage } from '@/types/agent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot, Info } from 'lucide-react';

interface AgentConversationProps {
  conversation: AgentConversation;
  onSendMessage: (agentType: AgentType, message: string) => Promise<void>;
}

export function AgentConversationUI({ conversation, onSendMessage }: AgentConversationProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    
    try {
      await onSendMessage(conversation.agentType, message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const getAgentName = (agentType: AgentType): string => {
    const agentNames: Record<string, string> = {
      'market-research': 'Expert en étude de marché',
      'legal': 'Conseiller juridique',
      'financial': 'Analyste financier',
      'customer': 'Spécialiste client',
      'strategy': 'Stratège SaaS',
      'statistics': 'Data Analyst'
    };
    
    return agentNames[agentType] || 'Agent';
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-900/40 rounded-lg border border-slate-800">
      <div className="p-3 border-b border-slate-800 bg-slate-800/50">
        <h3 className="font-medium text-white">Conversation avec {getAgentName(conversation.agentType)}</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez une question à l'agent..."
            className="bg-slate-800 border-slate-700"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !message.trim()} 
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  message: AgentMessage;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  
  if (isSystem) {
    return (
      <div className="flex items-start gap-2 text-gray-400 text-sm bg-slate-800/30 p-2 rounded-md">
        <Info className="h-4 w-4 mt-0.5 shrink-0" />
        <div>{message.content}</div>
      </div>
    );
  }
  
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center shrink-0">
          <Bot className="w-4 h-4 text-indigo-300" />
        </div>
      )}
      
      <div className={`max-w-[85%] p-3 rounded-lg ${
        isUser 
          ? 'bg-indigo-600/40 text-white rounded-tr-none' 
          : 'bg-slate-800/60 text-slate-100 rounded-tl-none'
      }`}>
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-cyan-600/30 flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-cyan-300" />
        </div>
      )}
    </div>
  );
}