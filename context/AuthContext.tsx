"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check local storage for user data on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string) => {
    // For testing, we'll just check if the email exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const user = users[email];
    
    if (user && user.password === password) {
      const userData = {
        email,
        name: user.name,
        avatar: user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`,
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    
    if (users[email]) {
      return false; // User already exists
    }

    // Store user data
    users[email] = {
      name,
      password,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
    };
    localStorage.setItem("users", JSON.stringify(users));

    // Auto login after registration
    const userData = {
      email,
      name,
      avatar: users[email].avatar,
    };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 