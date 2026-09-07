import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingOverlay from "../components/common/LoadingOverlay";
import ConnectionError from "../components/common/ConnectionError";

function PublicRoute() {
  const { user, isAuthChecking, connectionFailed } = useAuth();
  const location = useLocation();

  if (isAuthChecking) {
    return <LoadingOverlay message="Connecting to server..." />;
  }

  if (connectionFailed) {
    return <ConnectionError />;
  }

  const destination = location.state?.from?.pathname || "/home";

  return user ? <Navigate to={destination} replace /> : <Outlet />;
}

export default PublicRoute;
