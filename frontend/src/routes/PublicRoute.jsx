import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PublicRoute() {
  const { user, isAuthChecking } = useAuth();

  if (isAuthChecking) return null;

  return user ? <Navigate to="/home" replace /> : <Outlet />;
}

export default PublicRoute;
