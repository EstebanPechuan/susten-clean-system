import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Productos from "./pages/Productos/Productos";
import Detalle from './pages/Detalle/Detalle';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import { AuthContext } from './context/AuthContext';
import AgregarProducto from './pages/AgregarProducto/AgregarProducto';

function App() {
  const {currentUser} = useContext(AuthContext)

  const RequiredAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to={'/login'} />
  }
  
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/registro'} element={<Registro />} />
          <Route path={'/productos'} element={<RequiredAuth><Productos /></RequiredAuth>} />
          <Route path={'/productos/:id'} element={<RequiredAuth><Detalle /></RequiredAuth>} />
          <Route path={'/nuevo_producto'} element={<RequiredAuth><AgregarProducto /></RequiredAuth>} />
          <Route path={'*'} element={<RequiredAuth><Productos /></RequiredAuth>} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
