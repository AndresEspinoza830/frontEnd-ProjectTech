import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import productoAxios from "../config/productoAxios";
import Destacado from "./Destacado";

const Destacados = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      try {
        const { data } = await productoAxios.get(
          "/listar-destacados?destacado=true&limit=4"
        );
        setProductos(data);
      } catch (error) {
        console.log(error);
      }
    };
    consultarApi();
  }, []);

  useEffect(() => {
    console.log(productos);
  }, [productos]);

  const navigate = useNavigate();

  return (
    <main className="w-full h-screen">
      <div className="max-w-[1240px] mx-auto ">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-center flex items-center space-x-4 justify-center">
            <div className="w-[9px] h-[9px] bg-primary"></div>{" "}
            <span>NUESTROS SERVICIOS</span>{" "}
            <div className="w-[9px] h-[9px] bg-primary"></div>
          </h2>
          <h3 className="font-medium text-5xl">Los Más Solicitados</h3>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            obortis <br /> ligula euismod sededesty am augue nisl.
          </p>
        </div>
        <div className="flex items-center justify-between mb-10">
          {productos &&
            productos.map((ser) => <Destacado ser={ser} key={ser._id} />)}
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            onClick={() => navigate("/productos")}
            className="btn-primary flex items-center space-x-2"
          >
            {" "}
            <span>Nuestros Productos</span> <IoIosArrowForward />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Destacados;
