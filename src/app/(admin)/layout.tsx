'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { 
  VideoIcon, 
  UsersIcon, 
  PackageIcon, 
  SettingsIcon,
  MenuIcon,
  XIcon,
  LogOutIcon,
  HomeIcon
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: HomeIcon
  },
  {
    title: 'Vídeos',
    href: '/admin/videos',
    icon: VideoIcon
  },
  {
    title: 'Contatos',
    href: '/admin/contacts',
    icon: UsersIcon
  },
  {
    title: 'Planos',
    href: '/admin/plans',
    icon: PackageIcon
  },
  {
    title: 'Configurações',
    href: '/admin/settings',
    icon: SettingsIcon
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Barra superior móvel */}
      <div className="lg:hidden bg-gray-800 text-white p-4 flex items-center justify-between">
        <button onClick={toggleSidebar} className="p-2">
          {isSidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        <span className="font-semibold">Painel Administrativo</span>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform transition-transform duration-200 ease-in-out z-50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Vanderoski</h1>
          
          {session?.user && (
            <div className="mb-8 pb-4 border-b border-gray-700">
              <p className="text-sm text-gray-400">Logado como</p>
              <p className="font-medium">{session.user.email}</p>
            </div>
          )}

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.title}</span>
                </Link>
              );
            })}

            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOutIcon size={20} />
              <span>Sair</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className={`
        transition-all duration-200 ease-in-out
        ${isSidebarOpen ? 'lg:ml-64' : ''}
      `}>
        <div className="p-8">
          {children}
        </div>
      </main>

      {/* Overlay para fechar o menu em dispositivos móveis */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
