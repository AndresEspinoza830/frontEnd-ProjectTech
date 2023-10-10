import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";

const Destacado = ({ ser, index }) => {
  return (
    <Link
      to={`/productos/${ser._id}`}
      className="border-[1px] group basis-1/5 h-[340px] cursor-pointer rounded-xl p-10 space-y-6 shadow-lg hover:shadow-2xl hover:shadow-indigo-300 hover:scale-105 hover:text-primary transition-transform transition-none duration-300 "
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center relative">
            <img src={`destacado${index + 1}.png`} alt={ser.nombre} />
          </div>
          <h4 className=" group-duration-200 font-medium">{ser.nombre}</h4>
        </div>
        <BsArrowUpRight
          className="group-hover:rotate-45 duration-300"
          style={{ width: "20px", height: "20px" }}
        />
      </div>
    </Link>
  );
};

export default Destacado;
