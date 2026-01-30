import React, { createContext, useContext, useState, ReactNode } from 'react';
import { enmRole } from 'src/utils/enums';
import { typUser } from 'src/utils/types';

interface AuthContextType {
  user: typUser | null;
  login: (email: string, password: string, role: enmRole) => Promise<void>;
  register: (fullName: string, email: string, password: string, role: enmRole) => Promise<void>;
  logout: () => void;
}

 const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<typUser | null>(null);

  const login = async (email: string, password: string, role: enmRole) => {
    // Mock login - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser({
      id: '1',
      fullName: role === enmRole.admin ? 'Admin User' : 'John Doe',
      email,
      role,
    });
  };

  const register = async (fullName: string, email: string, password: string, role: enmRole) => {
    // Mock register - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser({
      id: Date.now().toString(),
      fullName,
      email,
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
