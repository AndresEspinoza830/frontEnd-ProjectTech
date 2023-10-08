import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../hooks/useContext";
import clienteAxios from "../config/clienteAxios";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  //Atrpamos al usuairo en el context
  const { usuario, setUsuario } = useContext(AuthContext);

  // En tu componente principal o en un componente de alto nivel
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Realizar una solicitud al nuevo endpoint "/user" para cargar la información del usuario
        const response = await clienteAxios.get("/user");
        const { _id, username, email } = response.data;
        console.log(response.data);

        // Actualizar el estado del contexto con la información del usuario
        setUsuario({
          auth: true,
          id: _id,
          username,
          email,
        });
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
  }, []);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="max-w-[1240px] mx-auto py-10">
      <div className="w-full h-full flex items-center justify-between ">
        <Link to={"/home"}>
          <img src="/tronix-logo.svg" alt="Logo" className="w-[150px] " />
        </Link>

        <nav>
          <ul className="flex space-x-12 font-semibold text-base text-black ">
            <Link
              to={"/home"}
              className="cursor-pointer hover:text-primary transition-colors duration-300 flex items-center space-x-1"
            >
              <span>Principal</span> <IoIosArrowDown className="mt-1" />
            </Link>
            <li className="cursor-pointer hover:text-primary transition-colors duration-300 flex items-center space-x-1">
              <a href="#about">Nosotros</a> <IoIosArrowDown className="mt-1" />
            </li>
            <li className="cursor-pointer hover:text-primary transition-colors duration-300 flex items-center space-x-1">
              <span>Servicios</span> <IoIosArrowDown className="mt-1" />
            </li>
            <li className="cursor-pointer hover:text-primary transition-colors duration-300 flex items-center space-x-1">
              <span>Contacto</span> <IoIosArrowDown className="mt-1" />
            </li>
          </ul>
        </nav>
        <div className="flex space-x-3">
          {usuario.auth ? (
            <div
              className="flex items-center space-x-2 cursor-pointer relative"
              onClick={handleMenu}
            >
              <p>{usuario.username}</p>
              <div className="uppercase bg-primary w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-primary text-white font-semibold text-xl">
                {usuario.username.slice(0, 1)}
              </div>
              {menu && (
                <div className="absolute w-full top-10 border-[1px] rounded-xl shadow-xl">
                  <ul>
                    <li className="px-8 py-4 ">{usuario.email}</li>
                    <li className=" px-8 py-4 ">Mis Productos</li>
                    <li className="  px-8 py-4">Cerrar Sesion</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="btn-primary flex items-center space-x-2"
                onClick={() => navigate("/login")}
              >
                <BiLogIn /> <span>Iniciar Sesion</span>
              </button>
              <button
                className="btn-primary flex items-center space-x-2"
                onClick={() => navigate("/registrar")}
              >
                <AiOutlineUserAdd /> <span>Registrate</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
