import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const NuevoPassword = () => {
  const { token } = useParams();

  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState("");
  const [passwordModificado, setPasswordModificado] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/recuperar-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        console.log(error);
        setTokenValido(false);
        setAlerta({
          msg: error.response.data.mensaje,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === "") {
      setAlerta({
        msg: "El password es obligatorio",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener minimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    try {
      setPasswordModificado(false);
      const { data } = await clienteAxios.post(`/recuperar-password/${token}`, {
        password,
      });
      setPassword("");
      setPasswordModificado(true);
      setAlerta({
        msg: data.mensaje,
        error: false,
      });
    } catch (error) {
      console.log(error);
      setPasswordModificado(false);
      setAlerta({
        msg: error.response.data.mensaje,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className=" font-black text-5xl capitalize text-center">
        Reestablece tu Password{" "}
        <span className="text-primary">ProjectTech</span>{" "}
      </h1>
      {msg && <Alerta alerta={alerta} />}
      {passwordModificado && (
        <Link
          className="block text-center my-5 text-slate-500  text-sm"
          to={"/user/login"}
        >
          <span className="text-primary font-bold">Inicia Sesión</span>
        </Link>
      )}
      {tokenValido && (
        <form
          className="my-10 bg-white p-10 py-5 rounded-lg shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-sm font-bold"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu nuevo password"
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <input
            type="submit"
            value="Actualizar Password"
            className="w-full bg-primary mb-5 text-white py-3 rounded-md uppercase font-bold cursor-pointer hover:bg-indigo-800 transition-colors duration-300"
          />
        </form>
      )}
    </>
  );
};

export default NuevoPassword;
