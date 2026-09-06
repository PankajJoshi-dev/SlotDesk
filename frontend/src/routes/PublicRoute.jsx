import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingOverlay from "../components/common/LoadingOverlay";
import ConnectionError from "../components/common/ConnectionError";

function PublicRoute() {
  const { user, isAuthChecking, connectionFailed } = useAuth();

  if (isAuthChecking) {
    return <LoadingOverlay message="Connecting to server..." />;
  }

  if (connectionFailed) {
    return <ConnectionError />;
  }

  return user ? <Navigate to="/home" replace /> : <Outlet />;
}

export default PublicRoute;
