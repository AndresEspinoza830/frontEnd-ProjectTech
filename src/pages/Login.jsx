import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1 className=" font-black text-5xl capitalize text-center">
        Inicia Sesion en <span className="text-indigo-700">ProjectTech</span>{" "}
      </h1>

      <form className="my-10 bg-white p-10 py-5 rounded-lg shadow-xl">
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
            type="password"
            placeholder="Escribe tu password"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <nav className="lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-slate-500  text-sm"
            to={"/registrar"}
          >
            ¿No tienes cuenta?{" "}
            <span className="font-bold text-indigo-700">Registrate</span>{" "}
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
          value="Iniciar Sesion"
          className="w-full bg-indigo-700 mb-5 text-white py-3 rounded-md uppercase font-bold cursor-pointer hover:bg-indigo-800 transition-colors duration-300"
        />
      </form>
    </>
  );
};

export default Login;
