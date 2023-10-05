import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import productoAxios from "../config/productoAxios";

const Destacados = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      try {
        const { data } = await productoAxios.get("/listar?destacado=true");
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
            productos.map((ser) => (
              <div
                key={ser._id}
                className="border-[1px] basis-1/5 h-[340px] rounded-xl p-10 space-y-12 shadow-lg hover:shadow-2xl hover:shadow-indigo-300 hover:scale-105 hover:text-primary transition-transform transition-none duration-300"
              >
                <div className="w-[70px] h-[80px] bg-primary"></div>
                <div className="space-y-5">
                  <h4 className="transition-colors duration-200">
                    {ser.nombre}
                  </h4>
                  <p>{ser.descripcion}</p>
                  <IoIosArrowDown />
                </div>
              </div>
            ))}
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