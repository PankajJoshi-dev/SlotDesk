import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PublicRoute() {
  const { user } = useAuth();

  return user ? <Navigate to="/home" replace /> : <Outlet />;
}

export default PublicRoute;
