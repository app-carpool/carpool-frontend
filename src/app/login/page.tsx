import { LoginForm } from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Columna izquierda: Imagen + slogan + fondo */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-dark-4 via-dark-3 to-dark-2 px-[156px] py-12 items-center justify-center">
        <div className="flex flex-col items-center text-center w-[200px]">
          <Image
            src="/carpool-wslogan.png"
            alt="Imagen de login"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
          <h1 className="font-outfit font-regular mt-4 text-lg text-white">
            Un viaje compartido, un destino en común.
          </h1>
        </div>

      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-[156px] py-12 min-h-screen md:min-h-0">
        <div className="w-full max-w-md">
          {/* Logo solo en mobile */}
          <div className="md:hidden mb-6 flex justify-center">
            <Image
              src="/logo-carpool.svg"
              alt="Logo"
              width={220}
              height={50}
              priority
            />
          </div>

          <LoginForm />
        </div>
        
      </div>
      
    </div>
  );
}
