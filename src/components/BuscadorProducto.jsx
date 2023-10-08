import React from "react";

const BuscadorProducto = ({ setBuscar, buscar }) => {
  return (
    <div className="w-full flex justify-between">
      <input
        type="text"
        placeholder="¿Qué estás buscando?"
        className="w-full p-2 rounded-xl ring-black ring-1 focus:outline-primary  placeholder-current"
        onChange={(e) => setBuscar(e.target.value)}
        value={buscar}
      />
    </div>
  );
};

export default BuscadorProducto;
