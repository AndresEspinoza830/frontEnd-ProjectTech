import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const Destacado = ({ ser }) => {
  return (
    <Link
      to={`/productos/${ser._id}`}
      className="border-[1px] basis-1/5 h-[340px] cursor-pointer rounded-xl p-10 space-y-12 shadow-lg hover:shadow-2xl hover:shadow-indigo-300 hover:scale-105 hover:text-primary transition-transform transition-none duration-300"
    >
      <div className="w-[70px] h-[80px] bg-primary"></div>
      <div className="space-y-5">
        <h4 className="transition-colors duration-200">{ser.nombre}</h4>
        <IoIosArrowDown />
      </div>
    </Link>
  );
};

export default Destacado;
