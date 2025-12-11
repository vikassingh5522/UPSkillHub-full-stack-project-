import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AuthContextType, AuthUser } from '../types';
import { signUp as apiSignUp, signIn as apiSignIn, getErrorMessage } from '../services/api';
import {
  getToken,
  setToken,
  removeToken,
  getStoredUser,
  setStoredUser,
  clearAuthData,
  isTokenExpired,
} from '../utils/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getStoredUser<AuthUser>();

    if (storedToken && storedUser && !isTokenExpired(storedToken)) {
      setTokenState(storedToken);
      setUser(storedUser);
    } else {
      // Clear invalid/expired data
      clearAuthData();
    }

    setIsLoading(false);
  }, []);

  const signUp = useCallback(async (
    email: string,
    password: string,
    name?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      const result = await apiSignUp(email, password, name);

      if (result.error) {
        return { success: false, error: getErrorMessage(result.error, result.details) };
      }

      if (result.data) {
        const { token: newToken, user: newUser, organization } = result.data;

        // Store token and user data
        setToken(newToken);
        const authUser: AuthUser = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          organizationId: organization.id,
          organizations: [{
            id: organization.id,
            name: organization.name,
            role: 'member',
          }],
        };
        setStoredUser(authUser);

        // Update state
        setTokenState(newToken);
        setUser(authUser);

        return { success: true };
      }

      return { success: false, error: 'Unexpected error occurred' };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      const result = await apiSignIn(email, password);

      if (result.error) {
        return { success: false, error: getErrorMessage(result.error, result.details) };
      }

      if (result.data) {
        const { token: newToken, user: newUser } = result.data;

        // Store token and user data
        setToken(newToken);
        const authUser: AuthUser = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          organizationId: newUser.organizationId,
          organizations: newUser.organizations,
        };
        setStoredUser(authUser);

        // Update state
        setTokenState(newToken);
        setUser(authUser);

        return { success: true };
      }

      return { success: false, error: 'Unexpected error occurred' };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    clearAuthData();
    setTokenState(null);
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
