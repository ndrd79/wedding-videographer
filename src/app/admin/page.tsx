'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  VideoIcon, 
  UsersIcon, 
  PackageIcon, 
  SettingsIcon,
} from 'lucide-react';

const dashboardCards = [
  {
    title: 'Vídeos',
    description: 'Gerencie os vídeos do seu portfólio.',
    href: '/admin/videos',
    icon: VideoIcon
  },
  {
    title: 'Contatos',
    description: 'Visualize e gerencie os contatos recebidos.',
    href: '/admin/contacts',
    icon: UsersIcon
  },
  {
    title: 'Planos',
    description: 'Configure os planos e preços.',
    href: '/admin/plans',
    icon: PackageIcon
  },
  {
    title: 'Configurações',
    description: 'Configure as preferências do sistema.',
    href: '/admin/settings',
    icon: SettingsIcon
  }
];

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Bem-vindo, {session?.user?.name || session?.user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center mb-4">
              <card.icon className="w-8 h-8 text-[#D4AF37]" />
              <h2 className="text-xl font-semibold text-white ml-3">{card.title}</h2>
            </div>
            <p className="text-gray-400">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
