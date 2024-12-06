'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Star, Trash2 } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
}

export default function MensagensPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@email.com',
      subject: 'Orçamento para Casamento',
      message: 'Olá, gostaria de saber mais informações sobre os pacotes de filmagem para casamento...',
      date: '2024-02-20',
      isRead: false,
      isStarred: false,
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      subject: 'Disponibilidade para Maio',
      message: 'Boa tarde! Vocês têm disponibilidade para realizar a filmagem de um casamento em maio?',
      date: '2024-02-19',
      isRead: true,
      isStarred: true,
    },
  ]);

  const toggleRead = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, isRead: !msg.isRead } : msg
    ));
  };

  const toggleStarred = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mensagens</h1>
        <p className="text-gray-400">Gerencie as mensagens recebidas</p>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`p-4 bg-[#1C1F2C] border-gray-800 ${
              !message.isRead ? 'border-l-4 border-l-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-white">{message.name}</h3>
                  {!message.isRead && (
                    <Badge variant="secondary" className="bg-blue-500">
                      Novo
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-1">{message.email}</p>
                <p className="text-sm font-medium text-white mb-2">
                  {message.subject}
                </p>
                <p className="text-sm text-gray-400">{message.message}</p>
                <p className="text-xs text-gray-500 mt-2">{message.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStarred(message.id)}
                  className={`p-1 rounded hover:bg-gray-700 ${
                    message.isStarred ? 'text-yellow-500' : 'text-gray-400'
                  }`}
                >
                  <Star size={16} />
                </button>
                <button
                  onClick={() => toggleRead(message.id)}
                  className={`p-1 rounded hover:bg-gray-700 ${
                    message.isRead ? 'text-gray-400' : 'text-blue-500'
                  }`}
                >
                  <MessageSquare size={16} />
                </button>
                <button
                  onClick={() => deleteMessage(message.id)}
                  className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-gray-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
