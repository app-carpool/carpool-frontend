import { ChevronLeft, User as UserIcon } from 'lucide-react';
import { User } from "@/types/user";
import Link from 'next/link';

export function ProfileHeader({ user }: { user: User }) {
  const hasImage = !!user.imageUrl;

  return (
    <div className="flex flex-col items-center gap-2">
      
      {hasImage ? (
        <img
          src={user.imageUrl}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <UserIcon className="w-12 h-12 text-gray-500" />
        </div>
      )}
      <h2 className="text-xl font-semibold">{user.username}</h2>
    </div>
  );
}
