import { User } from "@/types/user";

export function ProfileHeader({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={user.imageUrl || '/default-avatar.png'}
        alt="Foto de perfil"
        className="w-24 h-24 rounded-full object-cover"
      />
      <h2 className="text-xl font-semibold">{user.username}</h2>
    </div>
  );
}
