import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.log('Auth service not available, running in demo mode');
        setUser(null);
      }
      setLoading(false);
    };

    getSession();

    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    } catch (error) {
      console.log('Auth state change listener not available');
      return () => {};
    }
  }, []);

  const login = async (credentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      // Demo login for when Supabase is not available
      console.log('Using demo login');
      const demoUser = {
        id: 'demo-user-123',
        email: credentials.email,
        user_metadata: { name: 'Demo User' }
      };
      setUser(demoUser);
      return { user: demoUser };
    }
  };

  const register = async (userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      // Demo registration
      console.log('Using demo registration');
      const demoUser = {
        id: 'demo-user-' + Date.now(),
        email: userData.email,
        user_metadata: { name: 'Demo User' }
      };
      setUser(demoUser);
      return { user: demoUser };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.log('Demo logout');
    }
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
