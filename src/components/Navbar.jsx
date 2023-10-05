import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[1240px] mx-auto py-10">
      <div className="w-full h-full flex items-center justify-between ">
        <Link to={"/home"}>
          <img src="tronix-logo.svg" alt="Logo" className="w-[150px] " />
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
