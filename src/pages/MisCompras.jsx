import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { IoCloseSharp } from "react-icons/io5";
import { ImFilePdf } from "react-icons/im";

import clienteAxios from "../config/clienteAxios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MisCompras = () => {
  const { idCliente } = useParams();

  const [productos, setProductos] = useState([]);
  const [mostrarIns, setMostrarIns] = useState("");

  const { auth } = useAuth();
  console.log(auth);

  useEffect(() => {
    const consultarProductos = async () => {
      try {
        const { data } = await clienteAxios(`/mis-productos/${idCliente}`);
        setProductos(data);
      } catch (error) {
        console.log(error);
      }
    };

    consultarProductos();
  }, []);

  // const pdfUrl = "http://localhost:5173/public/pdf/backup2.pdf";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const verificarPDF = (pdf) => {
    setMostrarIns(pdf);
  };

  if (!productos.length) return "No exiten productos comprados.";

  return (
    <div className="bg-white relative  ">
      <Header />
      <Navbar />
      {mostrarIns !== "" && (
        <div className="w-full h-auto py-4 flex flex-col items-center  absolute  mx-auto top-0 bg-black/80 backdrop-blur-sm">
          <IoCloseSharp
            className=" bg-white w-[30px] h-[30px] self-end mr-56 p-2 rounded-full cursor-pointer"
            onClick={() => setMostrarIns("")}
          />
          <Document
            file={`${import.meta.VITE_BACKEND_URL}/${mostrarIns}`}
            onLoadSuccess={onDocumentLoadSuccess}
            pageMode="useThumbs"
            className=""
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
      )}

      <div className="w-full min-h-screen">
        <div className="w-full max-w-[1240px] mx-auto px-2">
          <table className="min-w-full text-left text-sm font-light ">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr className="text-base">
                <th scope="col" className="px-6 py-4">
                  Instructivo
                </th>
                <th scope="col" className="px-6 py-4">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-4">
                  Precio
                </th>
                <th scope="col" className="px-6 py-4">
                  PDF
                </th>
              </tr>
            </thead>
            <tbody>
              {productos &&
                productos.map((producto) => (
                  <tr
                    key={producto._id}
                    className="border-b dark:border-neutral-500 text-base"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <img
                        src={producto?.imagen?.secure_url}
                        alt={producto?.nombre}
                        width={200}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {producto?.nombre}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      $ {producto?.precio}
                    </td>
                    <td>
                      <button
                        className="btn-primary flex items-center space-x-2"
                        onClick={() => verificarPDF(producto?.pdf?.normal)}
                      >
                        <ImFilePdf />
                        <span>Visualizar</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MisCompras;
