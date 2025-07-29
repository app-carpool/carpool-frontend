type Role = 'pasajero' | 'chofer';

export function RoleSwithcer({ role, onChange }: { role: Role; onChange: (r: Role) => void }) {
  return (
    <div className="flex justify-center my-4">
      <button
        onClick={() => onChange('pasajero')}
        className={`px-4 py-2 rounded-l-full border ${role === 'pasajero' ? 'bg-primary text-white' : 'bg-gray-200'}`}
      >
        Pasajero
      </button>
      <button
        onClick={() => onChange('chofer')}
        className={`px-4 py-2 rounded-r-full border ${role === 'chofer' ? 'bg-primary text-white' : 'bg-gray-200'}`}
      >
        Chofer
      </button>
    </div>
  );
}
