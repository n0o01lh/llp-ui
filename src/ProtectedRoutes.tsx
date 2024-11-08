import { Navigate, Outlet } from "react-router";
import { UserStoreState, useUserStore } from "./store/userStore";

const ProtectedRoutes = () => {
  const user = useUserStore((state: UserStoreState) => state.userAuth);

  if (!user) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
