'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, UserPlus } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  status: 'Ativo' | 'Concluído' | 'Pendente';
}

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients] = useState<Client[]>([
    {
      id: 1,
      name: 'João e Maria',
      email: 'joaomaria@email.com',
      phone: '(11) 98765-4321',
      eventDate: '2024-05-15',
      status: 'Ativo',
    },
    {
      id: 2,
      name: 'Pedro e Ana',
      email: 'pedroana@email.com',
      phone: '(11) 91234-5678',
      eventDate: '2024-06-22',
      status: 'Pendente',
    },
    {
      id: 3,
      name: 'Lucas e Julia',
      email: 'lucasjulia@email.com',
      phone: '(11) 99876-5432',
      eventDate: '2024-03-10',
      status: 'Concluído',
    },
  ]);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'Ativo':
        return 'text-green-500';
      case 'Pendente':
        return 'text-yellow-500';
      case 'Concluído':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Clientes</h1>
        <p className="text-gray-400">Gerencie seus clientes</p>
      </div>

      <Card className="p-6 bg-[#1C1F2C] border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-[#282D3F] border-gray-700 text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black rounded-lg hover:bg-[#B39030] transition-colors">
            <UserPlus size={16} />
            <span>Novo Cliente</span>
          </button>
        </div>

        <div className="rounded-md border border-gray-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">Nome</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Telefone</TableHead>
                <TableHead className="text-gray-400">Data do Evento</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="text-white">{client.name}</TableCell>
                  <TableCell className="text-gray-400">{client.email}</TableCell>
                  <TableCell className="text-gray-400">{client.phone}</TableCell>
                  <TableCell className="text-gray-400">
                    {new Date(client.eventDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className={getStatusColor(client.status)}>
                      {client.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
