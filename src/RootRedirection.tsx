import { Navigate, Outlet } from "react-router";
import { UserStoreState, useUserStore } from "./store/userStore";

const RootRedirection = () => {
  const user = useUserStore((state: UserStoreState) => state.userAuth);
  if (!user) {
    return <Outlet />;
  }

  return <Navigate to={"/home"} replace />;
};

export default RootRedirection;
