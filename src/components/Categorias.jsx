import { useEffect, useState } from "react";
import productoAxios from "../config/productoAxios";

const Categorias = ({ setCategoria, categoria, setRadioValue }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const consultarCategorias = async () => {
      try {
        const { data } = await productoAxios.get("/categorias");
        setCategorias(data);
      } catch (error) {
        console.log(error);
      }
    };
    consultarCategorias();
  }, []);

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setRadioValue(value); // Actualizar el estado del radio button seleccionado
    setCategoria(value);
  };

  return (
    <details className="space-y-4 border-b-[1px] py-3 cursor-pointer">
      <summary className="font-bold text-xl">Categorias</summary>
      {categorias &&
        categorias.map((cat) => (
          <label
            key={cat._id}
            className="w-full block space-x-3 px-2 cursor-pointer"
          >
            <input
              type="radio"
              name="categoria"
              value={cat._id}
              checked={categoria === cat._id} // Comprobar si este radio button está seleccionado
              onChange={handleRadioChange}
            />
            <span>{cat.descripcion}</span>
          </label>
        ))}
    </details>
  );
};

export default Categorias;
