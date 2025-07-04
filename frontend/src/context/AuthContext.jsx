import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/auth/profile', {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      '/api/auth/login',
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data);
    return res.data;
  };

  const googleLogin = async (credential) => {
    const res = await axios.post(
      '/api/auth/google',
      { credential },
      { withCredentials: true }
    );
    setUser(res.data);
    return res.data;
  };

  const logout = async () => {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await axios.get('/api/auth/profile', {
        withCredentials: true,
      });
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        googleLogin,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
