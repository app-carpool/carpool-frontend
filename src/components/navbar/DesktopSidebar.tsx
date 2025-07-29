'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bell, User, Infinity } from 'lucide-react';
import { useAuth } from '@/contexts/authContext';

const navItems = [
  { href: '/home', icon: Home, label: 'Inicio' },
  { href: '/search', icon: Search, label: 'Buscar' },
  { href: '/notifications', icon: Bell, label: 'Notificaciones' },
  { href: '/profile', icon: User, label: 'Perfil' },
];

export default function DesktopSidebar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  if (!user || loading) return null;

  const allowedPaths = ['/home', '/search', '/notifications', '/profile','/register-driver'];
  const shouldShowSidebar = allowedPaths.some((path) => pathname.startsWith(path));
  if (!shouldShowSidebar) return null;

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-background border-r border-gray-200 dark:border-gray-700 flex-col justify-between px-6 py-8 z-50">
      {/* Top section: logo y navegación */}
      <div>
        <h1 className="text-xl font-semibold mb-10 flex items-center gap-1"><Infinity size={40} />Carpool</h1>
        <nav className="flex flex-col gap-2">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary bg-gray-100 dark:bg-gray-800'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section: usuario y logout */}
      <div className="text-sm text-gray-600 flex flex-col gap-2">
        <span className="font-medium">{user.username}</span>
        <button
          onClick={logout}
          className="text-red-500 hover:underline font-medium transition-colors text-left"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
