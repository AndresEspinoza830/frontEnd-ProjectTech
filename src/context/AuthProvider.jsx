import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  // const navigate = useNavigate();

  useEffect(() => {
    const consultarUsuario = async () => {
      try {
        const { data } = await clienteAxios("/user");
        setAuth(data);
        // navigate("/user/login");
      } catch (error) {
        console.log(error);
        setAuth({});
      }
      setCargando(false);
    };
    consultarUsuario();
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando, cerrarSesionAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
