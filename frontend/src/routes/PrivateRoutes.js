import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoutes = ({roles}) => {
  const { user } = useAuth();
  const isAuthorized = user && roles.includes(user.role);
  if (!isAuthorized) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
