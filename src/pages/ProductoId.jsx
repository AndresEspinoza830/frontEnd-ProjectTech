import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productoAxios from "../config/productoAxios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import useAuth from "../hooks/useAuth";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ProductoId = () => {
  const [producto, setProducto] = useState({});

  const { idProducto } = useParams();

  const { auth } = useAuth();
  console.log(auth);
  console.log(producto);

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

  // const pdfUrl =
  //   "http://localhost:5173/public/pdf/INSTRUCTIVO DE CONEXIÓN DE IMPRESORAS - BORROSO.pdf";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [numPages, setNumPages] = useState(null);

  const redirectCheckout = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/create-checkout-session`,
        producto
      );

      const stripeUrl = data.url;

      // Redirigir a la URL de Stripe en una nueva ventana o pestaña
      window.location.href = stripeUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <Header />
      <Navbar />
      <div className="w-full ">
        <div className="max-w-[1240px] mx-auto flex space-x-4">
          <div className="w-7/12 mx-auto">
            <Document
              file={
                producto?.precio === 0
                  ? `${import.meta.env.VITE_BACKEND_URL}/${
                      producto?.pdf?.normal
                    }`
                  : `${import.meta.env.VITE_BACKEND_URL}/${producto?.pdf?.blur}`
              }
              onLoadSuccess={onDocumentLoadSuccess}
              pageMode="useThumbs"
            >
              {Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={722}
                  debug={true}
                  className={`border-[1px] border-slate-100 mb-4 shadow-md text-center `}
                  renderTextLayer={false}
                />
              ))}
            </Document>
          </div>

          <aside
            className="w-4/12 flex flex-col space-y-8 "
            style={{ position: "sticky", top: 150, height: "100vh" }}
          >
            <div className="space-y-3">
              <h6 className="font-semibold text-3xl">{producto?.nombre}</h6>
              <h2 className="font-medium text-lg">
                Categoria: {producto?.categoria?.descripcion}
              </h2>
              <p className="leading-5 text-sm">{producto?.descripcion}</p>
              {producto?.precio === 0 ? (
                <p>Gratis!</p>
              ) : (
                <p>Precio: ${producto?.precio}</p>
              )}
            </div>

            <div className="border-[1px] shadow-xl rounded-xl p-2 py-12 space-y-10">
              <div className="flex items-center justify-center">
                <img src="/tronix-logo.svg" alt="" />
              </div>
              <div className="space-y-10">
                {producto?.precio !== 0 ? (
                  <>
                    {auth?.productos?.includes(producto?._id) ? (
                      <>
                        <h3 className="text-2xl font-light text-center">
                          Ya compró este producto
                        </h3>
                        <div className="flex justify-center items-center">
                          <Link
                            to={`/mis-compras/${auth?.id}`}
                            className="bg-primary text-white px-20 py-2 animate-bounce"
                          >
                            Ver PDF
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-light text-center">
                          Esta leyendo una <br /> previsualización
                        </h3>
                        <div className="flex justify-center items-center">
                          <button
                            onClick={redirectCheckout}
                            className="bg-primary text-white px-20 py-2 animate-bounce"
                          >
                            Comprar PDF
                          </button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-light text-center">
                      Tiene acceso total
                    </h3>
                    <div className="flex justify-center items-center">
                      <Link
                        to={"/productos"}
                        className="bg-primary text-white px-20 py-2 animate-bounce"
                      >
                        Ver más PDFs
                      </Link>
                    </div>
                  </>
                )}
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
