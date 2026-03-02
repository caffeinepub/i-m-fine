import { useState, useEffect } from 'react';
import { useActor } from './useActor';

const PLAYBOOK_TOKEN_KEY = 'playbook_session_token';

export function usePlaybookAuth() {
  const { actor } = useActor();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = sessionStorage.getItem(PLAYBOOK_TOKEN_KEY);
      
      if (!storedToken || !actor) {
        setIsAuthenticated(false);
        setIsValidating(false);
        return;
      }

      try {
        const isValid = await actor.validatePlaybookToken(storedToken);
        if (isValid) {
          setToken(storedToken);
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem(PLAYBOOK_TOKEN_KEY);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token validation error:', error);
        sessionStorage.removeItem(PLAYBOOK_TOKEN_KEY);
        setIsAuthenticated(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [actor]);

  // Keep token active with periodic pings
  useEffect(() => {
    if (!isAuthenticated || !token || !actor) return;

    const interval = setInterval(async () => {
      try {
        await actor.keepTokenActive(token);
      } catch (error) {
        console.error('Failed to keep token active:', error);
        logout();
      }
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated, token, actor]);

  const login = async (username: string, password: string): Promise<boolean> => {
    if (!actor) throw new Error('Actor not available');

    try {
      const success = await actor.authenticatePlaybookUser(username, password);
      
      if (success) {
        const newToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem(PLAYBOOK_TOKEN_KEY, newToken);
        setToken(newToken);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    const storedToken = sessionStorage.getItem(PLAYBOOK_TOKEN_KEY);
    
    if (storedToken && actor) {
      try {
        await actor.logoutPlaybookUser(storedToken);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    sessionStorage.removeItem(PLAYBOOK_TOKEN_KEY);
    setToken(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isValidating,
    token,
    login,
    logout,
  };
}
