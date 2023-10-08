import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import productoAxios from "../config/productoAxios";
import fs from "fs"; // Importa la biblioteca 'fs' para trabajar con el sistema de archivos

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const productos = [
  { id: 1, nombre: "Producto 1" },
  { id: 2, nombre: "Producto 2" },
  { id: 3, nombre: "Producto 3" },
  { id: 4, nombre: "Producto 4" },
  { id: 5, nombre: "Producto 5" },
  { id: 6, nombre: "Producto 6" },
  { id: 7, nombre: "Producto 7" },
  { id: 8, nombre: "Producto 8" },
  { id: 9, nombre: "Producto 9" },
  { id: 10, nombre: "Producto 10" },
  { id: 11, nombre: "Producto 11" },
  { id: 12, nombre: "Producto 12" },
  { id: 13, nombre: "Producto 13" },
  { id: 14, nombre: "Producto 14" },
  { id: 15, nombre: "Producto 15" },
];

const productosPorPagina = 5; // Número de productos por página

const ProductoId = () => {
  const [producto, setProducto] = useState({});

  const { idProducto } = useParams();

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

  const [paginaActual, setPaginaActual] = useState(1);

  // Calcular el índice inicial y final de los productos para la página actual
  const indiceInicial = (paginaActual - 1) * productosPorPagina;
  const indiceFinal = paginaActual * productosPorPagina;

  // Filtrar la lista de productos para mostrar solo los de la página actual
  const productosPaginaActual = productos.slice(indiceInicial, indiceFinal);

  // Función para cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  return (
    <>
      <PDFViewer>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      <div>
        <h2>{producto.nombre}</h2>
        <h2>{producto._id}</h2>
      </div>
      <h1>Lista de Productos</h1>
      <ul>
        {productosPaginaActual.map((producto) => (
          <li key={producto.id}>{producto.nombre}</li>
        ))}
      </ul>
      <div>
        {/* Botones de paginación */}
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <span>Página {paginaActual}</span>
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={
            paginaActual === Math.ceil(productos.length / productosPorPagina)
          }
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default ProductoId;
