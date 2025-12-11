// Authentication utilities for token management

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

/**
 * Store JWT token in localStorage
 */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Retrieve JWT token from localStorage
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove JWT token from localStorage
 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Store user data in localStorage
 */
export function setStoredUser(user: unknown): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Retrieve user data from localStorage
 */
export function getStoredUser<T>(): T | null {
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user) as T;
  } catch {
    return null;
  }
}

/**
 * Remove user data from localStorage
 */
export function removeStoredUser(): void {
  localStorage.removeItem(USER_KEY);
}

/**
 * Clear all auth data from localStorage
 */
export function clearAuthData(): void {
  removeToken();
  removeStoredUser();
}

/**
 * Get authorization headers with Bearer token
 */
export function getAuthHeaders(): Record<string, string> {
  const token = getToken();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Check if token exists (basic auth check)
 */
export function hasToken(): boolean {
  return !!getToken();
}

/**
 * Parse JWT token payload (without validation)
 * Note: This does not verify the token signature
 */
export function parseToken(
  token: string
): { exp?: number; [key: string]: unknown } | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

/**
 * Check if token is expired (basic check without server validation)
 */
export function isTokenExpired(token?: string | null): boolean {
  const tokenToCheck = token || getToken();
  if (!tokenToCheck) return true;

  const payload = parseToken(tokenToCheck);
  if (!payload || !payload.exp) return true;

  // exp is in seconds, Date.now() is in milliseconds
  return Date.now() >= payload.exp * 1000;
}
