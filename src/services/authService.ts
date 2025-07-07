import { LoginFormData, RegisterFormData } from "@/types/forms";
import { LoginResponse, RegisterResponse } from "@/types/response/auth";

export async function loginUser(data: LoginFormData): Promise<{
    success: boolean; 
    data?:LoginResponse; 
    message?: string}
> {
    try {
        const res = await fetch('/api/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            throw new Error('Credenciales inválidas')
        }

        const response: LoginResponse = await res.json();

        return {success: true, data: response}
    } catch (err: any) {
        return {success: false, message: err.message}
    }
    
}

export async function registerUser(data: RegisterFormData): Promise<{
    success:boolean;
    data?:RegisterResponse;
    message?: string}
> {
    try {
        const res = await fetch('/api/register',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })

        if (!res.ok){
            throw new Error('Datos inválidos')
        }

        const response: RegisterResponse = await res.json();

        return {success: true, data: response}
    } catch (err: any) {
        return {success: false, message: err.message}
    }
}

export async function logoutUser(): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const res = await fetch('/api/logout', {
      method: 'POST',
    });

    if (!res.ok) {
      throw new Error('Error al cerrar sesión');
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
