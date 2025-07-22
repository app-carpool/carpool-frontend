import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface RoleOptionsProps {
  role: 'driver' | 'passenger';
  logout: ()=> void;
}

export function RoleOptions({ role, logout }: RoleOptionsProps) {
  const isDriver = role === 'driver';

  const linkClasses =
    'flex justify-between items-center px-4 py-3 border-b border-gray-2 rounded cursor-pointer hover:bg-gray-2';

  return (
    <div className="flex flex-col">
      <div>
        <Link href="/profile" className={linkClasses}>
          <span>Perfil</span>
          <ChevronRight size={18} />
        </Link>

        {isDriver && (
          <Link href="/vehiculos" className={linkClasses}>
            <span>Vehículos</span>
            <ChevronRight size={18} />
          </Link>
        )}
        <Link
          href={`/trips/${isDriver ? 'driver' : 'passenger'}`}
          className={linkClasses}
        >
          <span>Historial de viajes</span>
          <ChevronRight size={18} />
        </Link>
      </div>

      <button
        onClick={logout}
        className={linkClasses + " text-left bg-transparent border-none mt-auto"}
        type="button"
      >
        <span>Cerrar Sesión</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

