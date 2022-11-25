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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/menuprincipal" element={<Menuprincipal />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/ventas" element={<Ventas />} />
      <Route path="/editarproductos" element={<Editarproductos />} />
      <Route path="/editarventa" element={<EditarVenta />} />
      <Route path="/nuevoproducto" element={<Nuevoproducto />} />
      <Route path="/crearventa" element={<CrearVenta />} />
    </Routes>
  );
}

export default App;
