import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productoAxios from "../config/productoAxios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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

  const pdfUrl = "http://localhost:5173/public/pdf/backup2.pdf";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleCheckout = async () => {
    await fetch("http://localhost:8800/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => {
        console.log(response.url);
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };

  return (
    <div className="bg-white">
      <Header />
      <Navbar />
      <div className="w-full ">
        <div className="max-w-[1240px] mx-auto flex space-x-4">
          <div className="w-7/12 mx-auto">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              pageMode="useThumbs"
            >
              {Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={722}
                  debug={true}
                  className="border-[1px] border-slate-100 mb-2 shadow-md text-center"
                  renderTextLayer={false}
                />
              ))}
            </Document>
            <p>
              Página {pageNumber} de {numPages}
            </p>
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
                  <button
                    className="bg-primary text-white px-20 py-2 animate-bounce"
                    onClick={handleCheckout}
                  >
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
