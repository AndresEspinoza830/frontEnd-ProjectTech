import { Link } from "react-router-dom";

const Producto = ({ producto }) => {
  return (
    <Link
      to={`/productos/${producto._id}`}
      key={producto._id}
      className="flex justify-between border-b-[1px] pb-6 group"
    >
      <div className="w-[200px]">
        <img
          src={
            producto?.imagen?.secure_url
              ? producto?.imagen?.secure_url
              : "https://www.unir.net/wp-content/uploads/2020/06/ficha_1920x1080_02-1.png"
          }
          alt={producto.nombre}
          className="group-hover:contrast-50"
        />
      </div>
      <div className="w-8/12 flex flex-col justify-between">
        <div>
          <h5 className="font-semibold text-lg">{producto.nombre}</h5>
          <p className="leading-4 text-sm">
            {producto.descripcion ?? "Texto falso por mientras bro pipipi"}
          </p>
        </div>

        {producto.destacado && (
          <span className="bg-yellow-200 text-sm p-2 rounded-md w-3/12 text-center">
            Lo más vendido
          </span>
        )}
      </div>
      <div>
        {producto.precio === 0 ? (
          <p className="font-bold">Gratis</p>
        ) : (
          <>
            <p className="font-bold text-lg">$ {producto.precio}</p>
            <p className="line-through">$ {producto.precio * 3}</p>
          </>
        )}
      </div>
    </Link>
  );
};

export default Producto;
