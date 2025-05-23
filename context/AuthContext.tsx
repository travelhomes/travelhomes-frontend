"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { BASE_URL } from "@/config/config";
import axios from 'axios';

interface User {
  email: string;
  name: string;
  avatar?: string;
  token?: string;
}

interface RegisterData {
  email: string;
  password: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<{ userId: number; token: string; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check cookies for token and user data on mount
    const token = Cookies.get('auth_token');
    const storedUser = Cookies.get('user');
    if (token && storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({ ...userData, token });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://3.7.52.212:5000";
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        username: email,
        password: password
      });

      const data = response.data;
      
      // Store token in cookie
      Cookies.set('auth_token', data.token, { expires: 7 }); // Token expires in 7 days
      
      const userData = {
        email,
        name: email,
        token: data.token,
      };

      console.log(userData, "hdddddddd")

      // Store user data in cookie
      Cookies.set('user', JSON.stringify(userData), { expires: 7 });

      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (data: RegisterData) => {
    try {

      const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://3.7.52.212:5000";
      console.log(`${BASE_URL}/api/auth/register`)
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        email: data.email,
        phone: data.phone,
        password: data.password
      });

      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Remove cookies on logout
    Cookies.remove('auth_token');
    Cookies.remove('user');
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