import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [alerta, setAlerta] = useState({});

  const { auth, setAuth, cargando } = useAuth();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validaciones
    if (user.email === "" || user.password === "") {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (user.password.length < 6) {
      setAlerta({
        msg: "El password debe tener minimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    try {
      const { data } = await clienteAxios.post("/login", user);
      console.log(data);
      setAuth(data);
      //Limpiar States
      setUser({
        email: "",
        password: "",
      });

      return navigate("/home");
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
      <h1
        className=" font-black text-5xl capitalize text-center"
        data-cy="titulo"
      >
        Inicia Sesion en <span className="text-primary">ProjectTech</span>{" "}
      </h1>
      {msg && <Alerta alerta={alerta} />}
      <form
        className="my-10 bg-white p-10 py-5 rounded-lg shadow-xl"
        data-cy="form-login"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-base font-bold"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            data-cy="email-input"
            placeholder="Email de Registro"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            onChange={handleChange}
            value={user.email}
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-base font-bold"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            data-cy="password-input"
            placeholder="Escribe tu password"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <nav className="lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-slate-500 text-sm"
            data-cy="registrar-cuenta"
            to={"/user/registrar"}
          >
            ¿No tienes cuenta?{" "}
            <span className="font-bold text-primary">Registrate</span>{" "}
          </Link>
          <Link
            className="block text-center my-5 text-slate-500  text-sm"
            data-cy="recuperar-password"
            to={"/user/olvide-password"}
          >
            Olvide mi Password
          </Link>
        </nav>
        <input
          type="submit"
          value="Iniciar Sesion"
          className="w-full bg-primary mb-5 text-white py-3 rounded-md uppercase font-bold cursor-pointer hover:bg-indigo-800 transition-colors duration-300"
          data-cy="submit-login"
        />
      </form>
    </>
  );
};

export default Login;
