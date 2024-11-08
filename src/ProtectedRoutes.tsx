import { Navigate, Outlet } from "react-router";
import { UserStoreState, useUserStore } from "./store/userStore";
import { jwtDecode } from "jwt-decode";

const ProtectedRoutes: React.FC<{ protectedRole: number }> = ({
  protectedRole,
}) => {
  const user = useUserStore((state: UserStoreState) => state.userAuth);

  if (!user) {
    return <Navigate to="/404" replace />;
  }

  const decodedToken = jwtDecode(user!.token) as { role: number };

  if (decodedToken.role != protectedRole) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
