import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { token, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return 'Loading...';
  if (!token) return <Navigate to="/login"  />;

  return <Outlet />;
};

export default ProtectedRoute;
