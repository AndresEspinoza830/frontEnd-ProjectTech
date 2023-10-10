import axios from "axios";

const categoriaAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/categorias`,
  withCredentials: true,
});

export default categoriaAxios;
