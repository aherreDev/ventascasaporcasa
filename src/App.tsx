import { useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Menuprincipal from "./Pages/Menuprincipal";
import Productos from "./Pages/Productos";
import Editarproductos from "./Pages/Editarproductos";
import Nuevoproducto from "./Pages/Nuevoproducto";
import Ventas from "./Pages/Ventas";
import CrearVenta from "./Pages/CrearVenta";
import EditarVenta from "./Pages/EditarVenta";
import SignUp from "./Pages/SignUp";
import Clientes from "./Pages/Clientes";
import CrearCliente from "./Pages/CrearCliente";
import EditarCliente from "./Pages/EditarCliente";
import Reporte from "./Pages/Reporte";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/menuprincipal" element={<Menuprincipal />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/ventas" element={<Ventas />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/editarproductos" element={<Editarproductos />} />
      <Route path="/editarventa" element={<EditarVenta />} />
      <Route path="/editarcliente" element={<EditarCliente />} />
      <Route path="/nuevoproducto" element={<Nuevoproducto />} />
      <Route path="/crearventa" element={<CrearVenta />} />
      <Route path="/crearcliente" element={<CrearCliente />} />
      <Route path="/reporte" element={<Reporte />} />
    </Routes>
  );
}

export default App;
