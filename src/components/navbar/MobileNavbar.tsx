'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/authContext';

const navItems = [
  { href: '/', icon: Home, label: 'Inicio' },
  { href: '/search', icon: Search, label: 'Buscar' },
  { href: '/notifications', icon: Bell, label: 'Notificaciones' },
  { href: '/profile', icon: User, label: 'Perfil' },
];

export default function MobileNavbar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  if (loading || !user) return null; // No mostrar si no está logueado o si está cargando

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-4 dark:border-t dark:border-gray-2  md:hidden">
      <ul className="flex justify-around items-center h-14">
        {navItems.map(({ href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center text-sm ${
                  isActive ? 'text-white' : 'text-gray-4'
                }`}
              >
                <Icon className="h-5 w-5 mb-0.5" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
