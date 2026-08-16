import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function OwnerRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user?.isFacilityOwner) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default OwnerRoute;
