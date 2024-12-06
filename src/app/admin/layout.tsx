'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Video, Users, Settings, MessageSquare, LogOut, Home } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const menuItems = [
    { icon: Home, label: 'Início', path: '/admin' },
    { icon: Video, label: 'Vídeos', path: '/admin/videos' },
    { icon: Calendar, label: 'Agenda', path: '/admin/agenda' },
    { icon: MessageSquare, label: 'Mensagens', path: '/admin/mensagens' },
    { icon: Users, label: 'Clientes', path: '/admin/clientes' },
    { icon: Settings, label: 'Configurações', path: '/admin/configuracoes' },
  ];

  if (pathname?.startsWith('/admin/login')) {
    return <>{children}</>;
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#15171E]">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  return (
    <div className="min-h-screen bg-[#15171E]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1C1F2C] text-white">
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-6">
              <Link href="/admin" className="text-xl font-bold">
                Admin Panel
              </Link>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-[#282D3F] text-white'
                          : 'text-gray-400 hover:bg-[#282D3F] hover:text-white'
                      }`}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 text-gray-400 hover:text-white w-full p-3 rounded-lg transition-colors hover:bg-[#282D3F]"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
