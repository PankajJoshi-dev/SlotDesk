import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingOverlay from "../components/common/LoadingOverlay";
import ConnectionError from "../components/common/ConnectionError";

function PrivateRoute() {
  const { user, isAuthChecking, isLoggingOut, connectionFailed } = useAuth();

  if (isAuthChecking) {
    return <LoadingOverlay message="Checking authentication..." />;
  }

  if (connectionFailed) {
    return <ConnectionError />;
  }

  if (isLoggingOut) {
    return <LoadingOverlay message="Logging out..." />;
  }

  return !user ? <Navigate to="/login" replace /> : <Outlet />;
}

export default PrivateRoute;
