import { Link, useFetcher, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import productoAxios from "../config/productoAxios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductoId = () => {
  const [producto, setProducto] = useState({});
  console.log(producto);

  const { idProducto } = useParams();
  console.log(idProducto);

  useEffect(() => {
    const consultarProducto = async () => {
      try {
        const { data } = await productoAxios.get(`/${idProducto}`);
        setProducto(data);
      } catch (error) {
        console.log(error);
      }
    };
    consultarProducto();
  }, []);

  useEffect(() => {
    console.log(producto);
  }, [producto]);

  return (
    <div className="bg-white">
      <Header />
      <Navbar />
      <div className="w-full h-screen">
        <div className="max-w-[1240px] mx-auto flex space-x-4">
          <embed
            src={import.meta.env.BASE_URL + "pdf/backup2.pdf"}
            className="w-8/12 h-[900px]"
            type="application/pdf"
            width="100%"
          />
          <aside className="w-4/12 flex flex-col justify-around">
            <div>
              <h6 className="font-semibold text-3xl">{producto?.nombre}</h6>
              <h2 className="font-medium text-lg">
                Categoria: {producto?.categoria?.descripcion}
              </h2>
              <p className="leading-5 text-sm">{producto?.descripcion}</p>
              <p>Precio: ${producto?.precio}</p>
            </div>

            <div className="border-[1px] shadow-xl rounded-xl p-2 py-12 space-y-10">
              <div className="flex items-center justify-center">
                <img src="/tronix-logo.svg" alt="" />
              </div>
              <div className="space-y-10">
                <h3 className="text-2xl font-light text-center">
                  Esta leyendo una <br /> previsualizacion
                </h3>
                <div className="flex justify-center items-center">
                  <button className="bg-primary text-white px-20 py-2 animate-bounce">
                    Comprar PDF
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductoId;
