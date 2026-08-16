import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PublicRoute() {
  const { user } = useAuth();

  return user ? (
    user.isAdmin ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/home" replace />
    )
  ) : (
    <Outlet />
  );
}

export default PublicRoute;
