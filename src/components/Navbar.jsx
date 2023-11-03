import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Cookie from "js-cookie";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const { auth, cerrarSesionAuth } = useAuth();

  const navigate = useNavigate();

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    Cookie.remove("token");
  };

  return (
    <div className="max-w-[1240px] mx-auto py-10 ">
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
            <Link
              to={"/productos"}
              className="cursor-pointer hover:text-primary transition-colors duration-300 flex items-center space-x-1"
            >
              <span>Servicios</span> <IoIosArrowDown className="mt-1" />
            </Link>
            <li className="cursor-pointer hover:text-primary transition-colors duration-300 flex items-center space-x-1">
              <span>Contacto</span> <IoIosArrowDown className="mt-1" />
            </li>
          </ul>
        </nav>
        <div className="flex space-x-3">
          {auth.id ? (
            <div
              className="flex items-center space-x-2 cursor-pointer relative w-[300px]"
              onClick={handleMenu}
            >
              <p>{auth.username}</p>
              <div className="uppercase bg-primary w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-primary text-white font-semibold text-xl">
                {auth.username.slice(0, 1)}
              </div>
              {menu && (
                <div className="absolute w-full top-10 border-[1px] rounded-xl shadow-xl bg-white z-10 overflow-hidden">
                  <ul className="w-full text-center">
                    <li className="px-8 py-4 font-semibold border-b-[1px]  cursor-default">
                      {auth.email}
                    </li>
                    <Link
                      to={`/mis-compras/${auth.id}`}
                      className="block py-4 hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Mis Productos
                    </Link>
                    <button
                      onClick={handleCerrarSesion}
                      className="w-full  px-8 py-4 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <BiLogOut value={{ style: { width: "200px" } }} />{" "}
                      <span>Cerrar Sesion</span>
                    </button>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="btn-primary flex items-center space-x-2"
                onClick={() => navigate("/user/login")}
              >
                <BiLogIn /> <span>Iniciar Sesion</span>
              </button>
              <button
                className="btn-primary flex items-center space-x-2"
                onClick={() => navigate("/user/registrar")}
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
