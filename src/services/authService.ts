import { LoginFormData, RegisterFormData } from "@/types/forms";
import { LoginResponse, RegisterResponse } from "@/types/response/auth";

// src/services/authService.ts
export const loginUser = async (data: LoginFormData & { recaptchaToken?: string }) => {
  try {
    const { recaptchaToken, ...loginData } = data;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (recaptchaToken) {
      headers['recaptcha'] = recaptchaToken;
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      headers, //equivalente a headers: headers
      body: JSON.stringify(loginData),
      credentials: 'include',
    });

    const result = await res.json();
    
    if (res.ok && result.success) {
      return { success: true, ...result };
    } else {
      return { success: false, error: result.message || 'Login failed' };
    }
  } catch (error) {
    console.error('💥 Error in loginUser:', error);
    return { success: false, error: 'Network error' };
  }
};


export async function registerUser(data: RegisterFormData & { recaptchaToken?: string }): Promise<{
    success:boolean;
    data?:RegisterResponse;
    message?: string}
> {
    try {
        const { recaptchaToken, ...registerData } = data;

        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        if (recaptchaToken) {
          headers['recaptcha'] = recaptchaToken;
        }

        const res = await fetch('/api/register',{
            method: 'POST',
            headers,  //equivalente a headers: headers
            body: JSON.stringify(registerData),
        })


        const responseBody = await res.json();

        if (!res.ok) {
          throw new Error(responseBody.message || 'Error desconocido');
        }

        return { success: true, data: responseBody };
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
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Error al cerrar sesión');
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

