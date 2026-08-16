import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute() {
  const { user, isLoggingOut } = useAuth();

  if (isLoggingOut) {
    return null;
  }

  return !user ? <Navigate to="/login" replace /> : <Outlet />;
}

export default PrivateRoute;
