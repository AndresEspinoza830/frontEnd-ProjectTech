import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Home from "./pages/Home";
import Productos from "./pages/Productos";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Area Publico */}
        <Route path="/" element={<AuthLayout />}>
          <Route index path="login" element={<Login />} />
          <Route path="registrar" element={<Registrar />} />
          <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
          <Route path="olvide-password" element={<OlvidePassword />} />
          <Route path="olvide-password/:token" element={<NuevoPassword />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
