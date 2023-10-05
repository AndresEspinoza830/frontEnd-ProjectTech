import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    setAlerta({});

    try {
      const { data } = await clienteAxios.post("/olvide-password", { email });
      setAlerta({
        msg: data.mensaje,
        error: false,
      });

      setEmail("");
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data.mensaje,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className=" font-black text-5xl capitalize text-center">
        Recupera tu acceso <span className="text-[#0e59f2]">ProjectTech</span>{" "}
      </h1>
      {msg && <Alerta alerta={alerta} />}
      <form
        className="my-10 bg-white p-10 py-5 rounded-lg shadow-xl"
        onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-sm font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <nav className="lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-slate-500  text-sm"
            to={"/login"}
          >
            ¿Ya tienes una cuenta?{" "}
            <span className="text-[#0e59f2] font-bold">Inicia Sesion</span>
          </Link>
          <Link
            className="block text-center my-5 text-slate-500  text-sm"
            to={"/registrar"}
          >
            ¿No tienes cuenta?{" "}
            <span className="font-bold text-[#0e59f2]">Registrate</span>{" "}
          </Link>
        </nav>
        <input
          type="submit"
          value="Enviar Instrucciones"
          className="w-full bg-[#0e59f2] mb-5 text-white py-3 rounded-md uppercase font-bold cursor-pointer hover:bg-indigo-800 transition-colors duration-300"
        />
      </form>
    </>
  );
};

export default OlvidePassword;
