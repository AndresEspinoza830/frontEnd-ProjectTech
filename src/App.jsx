import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoId from "./pages/ProductoId";
import MisCompras from "./pages/MisCompras";
import AppLayout from "./layout/AppLayout";
import { AuthProvider } from "./context/AuthProvider";
import CompraExitosa from "./pages/CompraExitosa";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Area Publica */}
          <Route path="/user" element={<AuthLayout />}>
            <Route index path="login" element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
          </Route>
          <Route path="/home" element={<Home />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />

          {/* Area Privada */}
          <Route path="/" element={<AppLayout />}>
            <Route path="productos" element={<Productos />} />
            <Route path="productos/:idProducto" element={<ProductoId />} />
            <Route path="mis-compras/:idCliente" element={<MisCompras />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
