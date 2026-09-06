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
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [connectionFailed, setConnectionFailed] = useState(false);

  async function checkAuth() {
    const timeout = setTimeout(() => {
      setConnectionFailed(true);
      setIsAuthChecking(false);
    }, 60000);

    setIsAuthChecking(true);

    try {
      const res = await getUserRequest();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      clearTimeout(timeout);
      setIsAuthChecking(false);
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
    setIsLoggingOut(true);

    try {
      const res = await logoutRequest(authData);
      if (res.success) {
        setUser(null);
      }
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isLoggingOut,
        isAuthChecking,
        connectionFailed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
