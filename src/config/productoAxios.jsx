import axios from "axios";

const productoAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/productos`,
  withCredentials: true,
});

export default productoAxios;
