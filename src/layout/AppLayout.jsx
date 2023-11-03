import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AppLayout = () => {
  const { auth, cargando } = useAuth();
  if (cargando) return "Cargando...";
  return <>{auth.id ? <Outlet /> : <Navigate to={"/user/login"} />}</>;
};

export default AppLayout;
