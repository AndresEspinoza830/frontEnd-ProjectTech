import { Link } from "react-router-dom";

const NuevoPassword = () => {
  return (
    <>
      <h1 className=" font-black text-5xl capitalize text-center">
        Reestable tu Password{" "}
        <span className="text-indigo-700">ProjectTech</span>{" "}
      </h1>

      <form className="my-10 bg-white p-10 py-5 rounded-lg shadow-xl">
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-base font-bold"
          >
            Nuevo Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Escribe tu nuevo  password"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Actualizar Password"
          className="w-full bg-indigo-700 mb-5 text-white py-3 rounded-md uppercase font-bold cursor-pointer hover:bg-indigo-800 transition-colors duration-300"
        />
      </form>
    </>
  );
};

export default NuevoPassword;
