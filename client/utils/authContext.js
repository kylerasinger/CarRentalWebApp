// utils/authContext.js
import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  const login = async () => {
    try {
      // Perform authentication logic (e.g., calling your API)
      const response = await axios.post('/api/login');
      setSession(response.data);
      router.push('/dashboard'); // Redirect after successful login
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setSession(null);
    router.push('/login'); // Redirect after logout
  };

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
