import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import productoAxios from "../config/productoAxios";
import clienteAxios from "../config/clienteAxios";
import AuthContext from "../hooks/useContext";
import Categorias from "../components/Categorias";
import Producto from "../components/Producto";
import BuscadorProducto from "../components/BuscadorProducto";
import Precios from "../components/Precios";

const Productos = () => {
  const [buscar, setBuscar] = useState("");
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState(null);
  const [radioValue, setRadioValue] = useState(""); // Estado para el valor seleccionado del radio button
  //Paginacion:
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5; // Número de productos por página
  // Calcular el índice inicial y final de los productos para la página actual
  const indiceInicial = (paginaActual - 1) * productosPorPagina;
  const indiceFinal = paginaActual * productosPorPagina;

  // Filtrar la lista de productos para mostrar solo los de la página actual
  const productosPaginaActual = productos.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  // Función para cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const { setUsuario } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Realizar una solicitud al nuevo endpoint "/user" para cargar la información del usuario
        const response = await clienteAxios.get("/user");
        const { _id, username, email } = response.data;

        // Actualizar el estado del contexto con la información del usuario
        setUsuario({
          auth: true,
          id: _id,
          username,
          email,
        });
      } catch (error) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate, setUsuario]);

  useEffect(() => {
    const consultarApi = async () => {
      try {
        const { data } = await productoAxios.get(
          `/listar?buscar=${buscar}&categoria=${categoria}&precio=${precio}`
        );
        setProductos(data);
        // Asegurarse de que la página actual sea válida después de actualizar los productos
        if (paginaActual > totalPaginas) {
          setPaginaActual(1); // Volver a la página 1 si la página actual ya no es válida
        }
      } catch (error) {
        console.log(error);
      }
    };

    consultarApi();
  }, [buscar, categoria, precio, paginaActual, totalPaginas]);

  const eliminarFiltros = () => {
    setBuscar("");
    setCategoria("");
    setPrecio(null);
    setRadioValue(""); // Desmarcar los radio buttons
  };

  return (
    <div className="bg-white">
      <Header />
      <Navbar />
      <section className="w-full max-w-[1240px] mx-auto flex min-h-screen justify-between items-start">
        <aside className="w-full  basis-3/12">
          <div className="w-full">
            <Categorias
              categoria={categoria}
              setCategoria={setCategoria}
              setRadioValue={setRadioValue}
            />
            <Precios
              precio={precio}
              setPrecio={setPrecio}
              setRadioValue={setRadioValue}
            />
            <div className="w-full flex items-center justify-center">
              <button
                className="bg-indigo-600 hover:bg-indigo-800 text-white px-8 py-2 rounded-full hover:shadow-xl hover:-mt-1 transition-all duration-300"
                onClick={eliminarFiltros}
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </aside>
        <main className="w-full basis-8/12  space-y-5">
          <BuscadorProducto setBuscar={setBuscar} buscar={buscar} />
          {totalPaginas === 0 ? (
            <h2>Lo sentimos, no hemos encontrado resultados.</h2>
          ) : (
            productosPaginaActual &&
            productosPaginaActual.map((producto) => (
              <Producto producto={producto} key={producto._id} />
            ))
          )}

          {totalPaginas !== 0 && (
            <div className="flex items-center justify-center space-x-4 ">
              <MdArrowBackIosNew
                onClick={() => cambiarPagina(paginaActual - 1)}
                // Verifica si la página actual es la primera
                disabled={paginaActual === 1}
                className={`cursor-pointer w-3 hover:w-4 duration-300 ${
                  paginaActual === 1 ? "text-gray-400" : "" // Cambia el color o estilo cuando está deshabilitado
                }`}
              >
                Anterior
              </MdArrowBackIosNew>
              <span>
                Página {paginaActual} de {totalPaginas}
              </span>
              <MdArrowForwardIos
                onClick={() => cambiarPagina(paginaActual + 1)}
                // Verifica si la página actual es la última
                disabled={
                  paginaActual ===
                  Math.ceil(productos.length / productosPorPagina)
                }
                className={`cursor-pointer w-3 hover:w-4 duration-300 ${
                  paginaActual ===
                  Math.ceil(productos.length / productosPorPagina)
                    ? "text-gray-400" // Cambia el color o estilo cuando está deshabilitado
                    : ""
                }`}
              >
                Siguiente
              </MdArrowForwardIos>
            </div>
          )}
        </main>
      </section>
      <Footer />
    </div>
  );
};

export default Productos;
