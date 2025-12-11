// API Service Layer for Authentication
import type {
  SignUpRequest,
  SignInRequest,
  SignUpResponse,
  SignInResponse,
  ApiError,
} from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Default organization for all auth requests
export const DEFAULT_ORGANIZATION = "AI Skills Lab";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  details?: unknown;
}

/**
 * Get auth token from localStorage
 */
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

/**
 * Base API request wrapper with error handling
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = getAuthToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add auth token if available
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || "An unexpected error occurred",
        details: data.details,
      };
    }

    return { data };
  } catch (error) {
    console.error("API Request failed:", error);
    return {
      error: "Network error. Please check your connection and try again.",
    };
  }
}

/**
 * Sign up a new user
 */
export async function signUp(
  email: string,
  password: string,
  name?: string,
  organizationName: string = DEFAULT_ORGANIZATION
): Promise<ApiResponse<SignUpResponse>> {
  const payload: SignUpRequest = {
    email,
    password,
    organizationName,
  };

  if (name) {
    payload.name = name;
  }

  return apiRequest<SignUpResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Sign in an existing user
 */
export async function signIn(
  email: string,
  password: string,
  organizationName: string = DEFAULT_ORGANIZATION
): Promise<ApiResponse<SignInResponse>> {
  const payload: SignInRequest = {
    email,
    password,
    organizationName,
  };

  return apiRequest<SignInResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Get user-friendly error message from API error
 */
export function getErrorMessage(error: string, details?: unknown): string {
  // Map common API errors to user-friendly messages
  const errorMessages: Record<string, string> = {
    "Organization not found": "The selected organization is not available.",
    "User with this email already exists":
      "An account with this email already exists. Please sign in instead.",
    "Invalid email or password": "Invalid email or password. Please try again.",
    "You do not have access to this organization":
      "You are not a member of this organization.",
    "Validation failed": "Please check your input and try again.",
    "An error occurred during signup":
      "Unable to create account. Please try again later.",
    "An error occurred during login":
      "Unable to sign in. Please try again later.",
  };

  return errorMessages[error] || error;
}
