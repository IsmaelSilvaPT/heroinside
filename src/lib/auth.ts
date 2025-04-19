import { jwtDecode } from "jwt-decode";

export interface User {
  id: string;
  email: string;
  nom: string;
  avatar?: string;
}

interface TokenPayload {
  sub: string;
  email: string;
  exp: number;
}

export const AUTH_TOKEN_KEY = "hero-auth-token";

export async function login(email: string, password: string): Promise<User> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Identifiants invalides");
    }

    const { token } = await response.json();
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    
    return getUserFromToken(token);
  } catch (error) {
    throw new Error("Erreur de connexion");
  }
}

export async function register(email: string, password: string, nom: string): Promise<User> {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, nom }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'inscription");
    }

    const { token } = await response.json();
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    
    return getUserFromToken(token);
  } catch (error) {
    throw new Error("Erreur d'inscription");
  }
}

export function logout(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getCurrentUser(): User | null {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return null;

  try {
    return getUserFromToken(token);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return false;

  try {
    const payload = jwtDecode<TokenPayload>(token);
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function getUserFromToken(token: string): User {
  const payload = jwtDecode<TokenPayload>(token);
  return {
    id: payload.sub,
    email: payload.email,
    nom: payload.email.split("@")[0], // Nom par défaut basé sur l'email
  };
}

export async function refreshToken(): Promise<void> {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return;

  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const { token: newToken } = await response.json();
      localStorage.setItem(AUTH_TOKEN_KEY, newToken);
    }
  } catch {
    logout();
  }
} 