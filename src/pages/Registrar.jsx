import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const Registrar = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validaciones
    if ([username, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Los passwords no son iguales", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener minimo 6 caracteres",
        error: true,
      });
      return;
    }

    //Si pasa las validaciones se limpia las alertas
    setAlerta({});

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/registro`,
        {
          username,
          password,
          email,
        }
      );

      //Si se creo con exito el usuario
      setAlerta({ msg: data.mensaje, error: false });

      //Buena practica limpiar states luego de su uso
      setUsername("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      console.log(error);
      if (error.response) {
        return setAlerta({ msg: error.response.data.mensaje, error: true });
      }
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className=" font-black text-5xl capitalize text-center">
        Crea tu cuenta en <span className="text-indigo-700">ProjectTech</span>{" "}
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white p-10 py-5 rounded-lg shadow-xl"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="username"
            className="uppercase text-gray-600 block text-base font-bold"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Tu nombre"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-base font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-base font-bold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Escribe tu password"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="repetir-password"
            className="uppercase text-gray-600 block text-base font-bold"
          >
            Repetir Password
          </label>
          <input
            id="repetir-password"
            type="password"
            placeholder="Repite tu password"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            onChange={(e) => setRepetirPassword(e.target.value)}
            value={repetirPassword}
          />
        </div>
        <nav className="lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-slate-500  text-sm"
            to={"/"}
          >
            ¿Ya tienes una cuenta?{" "}
            <span className="text-indigo-700 font-bold">Inicia Sesion</span>
          </Link>
          <Link
            className="block text-center my-5 text-slate-500  text-sm"
            to={"/olvide-password"}
          >
            Olvide mi Password
          </Link>
        </nav>
        <input
          type="submit"
          value="Crear Cuenta"
          className={
            "w-full bg-indigo-700 mb-5 disabled:cursor-not-allowed text-white py-3 rounded-md uppercase font-bold cursor-pointer hover:bg-indigo-800 transition-colors duration-300"
          }
        />
      </form>
    </>
  );
};

export default Registrar;
