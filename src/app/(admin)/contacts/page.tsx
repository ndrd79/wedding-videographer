'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Trash2Icon, MailIcon, PhoneIcon, CalendarIcon } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  eventDate: string;
  createdAt: string;
}

export default function ContactsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
    fetchContacts();
  }, [status, router]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data.sort((a: Contact, b: Contact) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este contato?')) {
      try {
        await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
        setContacts(contacts.filter(contact => contact.id !== id));
      } catch (error) {
        console.error('Erro ao excluir contato:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-white">Contatos</h1>

      <div className="grid gap-6">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-gray-800 rounded-lg p-6 relative group"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleDelete(contact.id)}
                className="text-red-500 hover:text-red-600 p-2"
                title="Excluir contato"
              >
                <Trash2Icon size={20} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">{contact.name}</h2>
                
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center gap-2">
                    <MailIcon size={18} />
                    <a href={`mailto:${contact.email}`} className="hover:text-blue-400">
                      {contact.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <PhoneIcon size={18} />
                    <a href={`tel:${contact.phone}`} className="hover:text-blue-400">
                      {contact.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarIcon size={18} />
                    <span>Data do Evento: {formatDate(contact.eventDate)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-300 mb-2">Mensagem:</h3>
                <p className="text-gray-400 whitespace-pre-wrap">{contact.message}</p>
                
                <div className="mt-4 text-sm text-gray-500">
                  Recebido em: {formatDate(contact.createdAt)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {contacts.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Nenhum contato recebido ainda.
          </div>
        )}
      </div>
    </div>
  );
}
