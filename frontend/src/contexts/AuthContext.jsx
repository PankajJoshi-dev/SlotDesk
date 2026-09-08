import { createContext, useContext, useState, useEffect } from "react";
import {
  getUserRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
} from "../api/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [connectionFailed, setConnectionFailed] = useState(false);

  useEffect(() => {
    // Reset logout state after redirecting to the landing page
    if (isLoggingOut && location.pathname === "/") {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, location.pathname]);

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
    let logoutSucceeded = false;

    try {
      const res = await logoutRequest(authData);
      if (res.success) {
        logoutSucceeded = true;
        toast.success("Logged out.");
        navigate("/", { replace: true });
        setUser(null);
      }
    } finally {
      if (!logoutSucceeded) {
        setIsLoggingOut(false);
      }
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
