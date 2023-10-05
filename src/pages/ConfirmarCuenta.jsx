import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const ConfirmarCuenta = () => {
  const { token } = useParams(); //tomamos el token de la url

  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios.get(`/confirmar/${token}`);
        setAlerta({ msg: data.mensaje, error: false });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({ msg: error.response.data.mensaje, error: true });
      }
    };
    confirmarCuenta();
  }, []);

  const { msg } = alerta;

  return (
    <>
      <h1 className=" font-black text-5xl capitalize text-center">
        Confirma tu Cuenta <span className="text-indigo-700">ProjectTech</span>{" "}
      </h1>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            className="block text-center my-5 text-slate-500  text-sm"
            to={"/login"}
          >
            <span className="text-indigo-700 font-bold">Inicia Sesión</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
