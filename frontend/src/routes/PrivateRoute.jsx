import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingOverlay from "../components/common/LoadingOverlay";
import ConnectionError from "../components/common/ConnectionError";

function PrivateRoute() {
  const { user, isAuthChecking, isLoggingOut, connectionFailed } = useAuth();
  const location = useLocation();

  if (isAuthChecking) {
    return <LoadingOverlay message="Checking authentication..." />;
  }

  if (connectionFailed) {
    return <ConnectionError />;
  }

  if (isLoggingOut) {
    return <LoadingOverlay message="Logging out..." />;
  }

  return !user ? (
    <Navigate
      to="/login"
      state={{
        from: location,
        reason: "protected-route",
      }}
      replace
    />
  ) : (
    <Outlet />
  );
}

export default PrivateRoute;
