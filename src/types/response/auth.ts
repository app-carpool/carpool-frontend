export interface LoginResponse {
  data: string; // JWT token
  messages: string[];
  state: string;
}

export interface RegisterResponse {
  data: null;
  messages: string[];
  state: string;
}
