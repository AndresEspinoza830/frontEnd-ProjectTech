const Precios = ({ setPrecio, precio, setRadioValue }) => {
  const handleRadioChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setRadioValue(Number(value));
    setPrecio(value);
  };

  return (
    <details className="my-3 space-y-4 border-b-[1px] py-3 cursor-pointer">
      <summary className="font-bold text-xl">Precio</summary>
      <label className="block space-x-3 px-2">
        <input
          type="radio"
          name="precio"
          value={0}
          checked={precio === "0"}
          onChange={handleRadioChange}
        />
        <span>Gratis</span>
      </label>
      <label htmlFor="" className="block space-x-3 px-2">
        <input
          type="radio"
          name="precio"
          value={1}
          checked={precio === "1"}
          onChange={handleRadioChange}
        />
        <span>De Pago</span>
      </label>
    </details>
  );
};

export default Precios;
