import { Mail, CheckCircle, Clock } from "lucide-react";

export default function EmailVerifyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center py-6 px-8">
      {/* Icono principal con animación sutil */}
      
      <div className="w-20 h-20 bg-gray-1/90 rounded-full flex items-center justify-center mb-4">
        <Mail className="w-10 h-10 text-primary" />
      </div>
        
     

      <h1 className="text-2xl font-semibold mb-2">Verificá tu correo</h1>
      
      <p className="text-gray-3 mt-4 max-w-md mb-8 font-inter">
        Te enviamos un correo electrónico con un enlace para verificar tu cuenta.
        Revisa tu bandeja de entrada y seguí las instrucciones.
      </p>

      {/* Instrucciones con iconos */}
      <div className="space-y-4 max-w-md font-inter">
        <div className="flex items-center space-x-3 text-sm text-gray-5">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 ">
            <span className="text-xs font-semibold text-gray-2">1</span>
          </div>
          <p className="text-left">Abrí tu aplicación de correo electrónico</p>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-5">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 ">
            <span className="text-xs font-semibold text-gray-2">2</span>
          </div>
          <p className="text-left">Buscá el correo de verificación (revisá spam si no lo encontrás)</p>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-5">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-gray-2">3</span>
          </div>
          <p className="text-left">Hacé clic en el enlace de verificación</p>
        </div>
      </div>

      {/* Nota adicional */}
      <div className="mt-8 flex items-center space-x-2 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        <p>El enlace expira en 48 horas</p>
      </div>

      {/* Enlace para reenviar (opcional) */}
      <button className="mt-6 text-blue-600 hover:text-blue-700 text-sm font-medium underline">
        ¿No recibiste el correo? Reenviar
      </button>
    </div>
  );
}