'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/authContext';

const navItems = [
  { href: '/home', icon: Home, label: 'Inicio' },
  { href: '/search', icon: Search, label: 'Buscar' },
  { href: '/notifications', icon: Bell, label: 'Notificaciones' },
  { href: '/profile', icon: User, label: 'Perfil' },
];

export default function DesktopNavbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  if (!user || loading) return null;

  const allowedPaths = ['/home', '/search', '/notifications', '/profile'];
  const shouldShowNavbar = allowedPaths.some((path) => pathname.startsWith(path));
  if (!shouldShowNavbar) return null;

  return (
    <nav className="hidden md:flex w-full h-16 border-b border-gray-200 dark:border-gray-2 bg-background px-6 items-center justify-between">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-semibold">Carpool</h1>
        <div className="flex gap-4">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary bg-gray-100 dark:bg-gray-800'
                    : 'text-gray-500 hover:text-primary'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="font-medium">{user.username}</span>
        <button
          onClick={logout}
          className="text-red-500 hover:underline font-medium transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
