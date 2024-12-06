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
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isLoginPage = pathname === '/admin/login';

  // Se for a página de login ou estiver carregando, retorna apenas o conteúdo
  if (isLoginPage || status === 'loading') {
    return children;
  }

  // Se não estiver autenticado, não renderiza nada (o middleware redirecionará)
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="bg-gray-800 text-white w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold">Vanderoski</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                      ${isActive 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }
                    `}
                  >
                    <item.icon className="mr-1.5 h-5 w-5" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {session?.user && (
                <div className="hidden md:flex items-center">
                  <span className="text-sm text-gray-400 mr-2">
                    {session.user.email}
                  </span>
                </div>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
              >
                <LogOutIcon className="mr-1.5 h-5 w-5" />
                Sair
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                {isSidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`
        md:hidden fixed inset-0 bg-gray-800 z-50 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-white">Vanderoski</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-gray-700"
            >
              <XIcon size={24} className="text-white" />
            </button>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
