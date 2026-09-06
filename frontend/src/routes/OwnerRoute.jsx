import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingOverlay from "../components/common/LoadingOverlay";
import ConnectionError from "../components/common/ConnectionError";

function OwnerRoute() {
  const { user, isAuthChecking, connectionFailed } = useAuth();

  if (isAuthChecking) {
    return <LoadingOverlay message="Checking authentication..." />;
  }

  if (connectionFailed) {
    return <ConnectionError />;
  }

  if (!user?.isFacilityOwner) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default OwnerRoute;
