'use client'

import { CompleteRegistrationForm } from "@/components/auth/CompleteRegistrationForm";
import { useSearchParams } from "next/navigation";

export default function CompleteProfilePage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || '' // obtienes el email desde la URL

  return (
      <main className="p-8 flex items-center justify-between">
        <div className='flex flex-col items-start'>
          <h1 className="text-3xl font-bold">Debes completar tu perfil</h1>
          <CompleteRegistrationForm email={email}/>
        </div>
      </main>
   
  );
}
