'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Session } from 'next-auth';
import { MenuIcon, XIcon, LogOutIcon } from 'lucide-react';

interface AdminSidebarProps {
  menuItems: Array<{
    href: string;
    title: string;
    icon: React.ElementType;
  }>;
  session: Session | null;
  signOut: (options?: { callbackUrl: string }) => void;
  pathname: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function AdminSidebar({
  menuItems,
  session,
  signOut,
  pathname,
  isSidebarOpen,
  toggleSidebar
}: AdminSidebarProps) {
  return (
    <>
      {/* Barra superior móvel */}
      <div className="lg:hidden bg-[#1C1F2C] text-white p-4 flex items-center justify-between">
        <button onClick={toggleSidebar} className="p-2">
          {isSidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        <div className="relative w-32 h-8">
          <Image
            src="/images/logo.png"
            alt="Vanderoski"
            fill
            className="object-contain brightness-0 invert"
            priority
            sizes="128px"
            quality={90}
          />
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-[#1C1F2C] text-white w-64 transform transition-transform duration-200 ease-in-out z-50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        <div className="p-6">
          {/* Logo container */}
          <div className="mb-6">
            <div className="relative w-40 h-12">
              <Image
                src="/images/logo.png"
                alt="Vanderoski"
                fill
                className="object-contain brightness-0 invert"
                priority
                sizes="160px"
                quality={90}
              />
            </div>
          </div>
          
          {session?.user && (
            <div className="text-sm text-gray-400 mb-6">
              Logado como<br />
              {session.user.email}
            </div>
          )}

          <nav className="mt-6 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 p-4 transition-colors
                    ${isActive 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-400 hover:bg-[#282D3F] hover:text-white'
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
              className="flex items-center space-x-3 p-4 text-gray-400 hover:bg-[#282D3F] hover:text-white w-full"
            >
              <LogOutIcon size={20} />
              <span>Sair</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Overlay para fechar o menu em dispositivos móveis */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
