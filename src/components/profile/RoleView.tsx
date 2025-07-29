import { PassengerOptions } from '@/components/profile/PassengerOptions';
import { DriverOptions } from '@/components/profile/DriverOptions';

type Role = 'pasajero' | 'chofer';

export function RoleView({ role }: { role: Role }) {
  if (role === 'pasajero') return <PassengerOptions />;
  if (role === 'chofer') return <DriverOptions />;
  return null;
}
