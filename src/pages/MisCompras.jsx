import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { IoCloseSharp } from "react-icons/io5";
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

  const pdfUrl = "http://localhost:5173/public/pdf/backup2.pdf";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const verificarPDF = (pdf) => {
    setMostrarIns(pdf);
  };

  return (
    <div className="bg-white relative h-screen">
      <Header />
      <Navbar />
      {mostrarIns !== "" && (
        <div className="w-full h-auto py-4 flex flex-col items-center  absolute  mx-auto top-0 bg-black/80">
          <IoCloseSharp
            className=" bg-white w-[30px] h-[30px] self-end mr-56 p-2 rounded-full cursor-pointer"
            onClick={() => setMostrarIns("")}
          />
          <Document
            file={`http://localhost:8800/${mostrarIns}`}
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

      <div className="w-full">
        <div className="w-full max-w-[1240px] mx-auto flex space-x-4 ">
          <table>
            <thead>
              <th>Instructivo</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>PDF</th>
            </thead>
            <tbody>
              {productos &&
                productos.map((producto) => (
                  <tr key={producto._id}>
                    <td>
                      <img
                        src={producto?.imagen?.secure_url}
                        alt={producto?.nombre}
                        width={200}
                      />
                    </td>
                    <td>{producto?.nombre}</td>
                    <td>{producto?.precio}</td>
                    <td>
                      <button
                        className="btn-primary"
                        onClick={() => verificarPDF(producto?.pdf?.normal)}
                      >
                        Visualizar
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
