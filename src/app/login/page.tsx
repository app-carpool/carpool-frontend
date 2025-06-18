import { LoginForm } from "@/components/auth/LoginForm";
import { LoginFormData } from "@/types/forms";
import Image from "next/image";

export default function LoginPage() {
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image
        src="/logo-carpool.svg"
        alt="Logo"
        width={220}
        height={50}
        className="mb-6" // margen debajo del logo
      />
      <LoginForm />
    </div>

  )
}
