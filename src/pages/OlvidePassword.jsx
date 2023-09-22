import { Link } from "react-router-dom";

const OlvidePassword = () => {
  return (
    <>
      <h1 className=" font-black text-5xl capitalize text-center">
        Recupera tu acceso <span className="text-indigo-700">ProjectTech</span>{" "}
      </h1>

      <form className="my-10 bg-white p-10 py-5 rounded-lg shadow-xl">
        <div className="mt-5">
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
            to={"/registrar"}
          >
            ¿No tienes cuenta?{" "}
            <span className="font-bold text-indigo-700">Registrate</span>{" "}
          </Link>
        </nav>
        <input
          type="submit"
          value="Enviar Instrucciones"
          className="w-full bg-indigo-700 mb-5 text-white py-3 rounded-md uppercase font-bold cursor-pointer hover:bg-indigo-800 transition-colors duration-300"
        />
      </form>
    </>
  );
};

export default OlvidePassword;
