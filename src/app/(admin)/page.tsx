'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          
          return (
            <Link
              key={card.href}
              href={card.href}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <Icon size={24} />
                </div>
                <h2 className="text-xl font-semibold text-gray-200">{card.title}</h2>
              </div>
              <p className="text-gray-400">{card.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Estatísticas ou widgets adicionais podem ser adicionados aqui */}
    </div>
  );
}
