import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

// Obtenemos la URL base de la API desde las variables de entorno
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Tipos permitidos para los campos que se pueden validar
type FieldType = 'username' | 'email' | 'dni';

// Tipos permitidos para el tipo de mensaje
type MessageType = 'success' | 'error' | null;

// Hook personalizado que valida un campo en tiempo real (username, email o dni)
export function useFieldValidator(field: FieldType) {
  // Estado para saber si el valor ingresado está disponible
  const [available, setAvailable] = useState<null | boolean>(null);

  // Estado para saber si se está haciendo una validación
  const [checking, setChecking] = useState(false);

  // Mensaje de feedback para mostrar al usuario
  const [message, setMessage] = useState<string | null>(null);

  // Tipo del mensaje: éxito, error o ninguno
  const [messageType, setMessageType] = useState<MessageType>(null);

  // Función de validación que se ejecuta con "debounce", o sea, se retrasa 2s después de que el usuario deja de tipear
  const validate = useCallback(
    debounce(async (value: string) => {
      // Si no hay valor o el username tiene menos de 3 caracteres, no validamos
      if (!value || (field === 'username' && value.length < 3)) {
        setAvailable(null);
        setChecking(false);
        return;
      }

      // Indicamos que está validando
      setChecking(true);
      try {
        // Hacemos la consulta a la API para validar el campo
        const res = await fetch(`${apiUrl}/users/validate-${field}?${field}=${value}`);
        const data = await res.json();

        // Si todo salió bien y el estado es OK, el valor está disponible
        if (res.ok && data.state === 'OK') {
          setAvailable(true);
          setMessage(data.messages?.[0] || `${field} disponible`);
          setMessageType('success');
        } else {
          // Si no está disponible o hay error de validación
          setAvailable(false);
          setMessage(data.messages?.[0] || `${field} no disponible`);
          setMessageType('error');
        }
      } catch (error) {
        // En caso de error en la petición
        setAvailable(null);
        setMessage(`Error validando ${field}`);
        setMessageType('error');
      } finally {
        // Terminamos la validación
        setChecking(false);
      }
    }, 1000), // Esperamos 2 segundos tras la última escritura
    [field] // Solo se vuelve a crear la función si cambia el tipo de campo
  );

  // Retornamos el estado y la función para usar en el componente
  return {
    available,     // true / false / null (si no se validó)
    checking,      // booleano para mostrar spinner
    message,       // mensaje para mostrar en UI
    messageType,   // success | error | null (estilo del mensaje)
    validate       // función para ejecutar al cambiar el valor del input
  };
}