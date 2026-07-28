import { createContext, useContext, useState, useEffect } from "react";
import {
  getUserRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
} from "../api/authApi";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkAuth() {
    setLoading(true);

    try {
      const res = await getUserRequest();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  // Call checkAuth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  async function login(authData) {
    setLoading(true);

    try {
      const res = await loginRequest(authData);
      setUser(res.data);
    } finally {
      setLoading(false);
    }
  }

  async function register(authData) {
    setLoading(true);

    try {
      const res = await registerRequest(authData);
      setUser(res.data);
    } finally {
      setLoading(false);
    }
  }

  async function logout(authData) {
    setLoading(true);

    try {
      const res = await logoutRequest(authData);
      if (res.success) {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
