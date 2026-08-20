import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { AuthUser } from "../../api/auth";

type RequireAuthProps = {
  user: AuthUser | null;
};

function RequireAuth({ user }: RequireAuthProps) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
