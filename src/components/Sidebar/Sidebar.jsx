import React from 'react'
import './Sidebar.css'
import logo from '../../assets/images/logo.png'
import { Link } from "react-router-dom";

function Sidebar() {
  const handleList = (e) => {
    e.target.nextElementSibling.classList.toggle('d-none');
  }
  
  return (
    <aside className='sidebar'>
        <img src={logo} alt="Logo Susten Clean" />
        <nav>
            <ul className='menu'>
                <li onClick={handleList}>Lista de Productos</li>
                <ul className='d-none'>
                  <li><Link to={'/productos'}>Todos los productos</Link></li>
                  <li><Link to={'/nuevo_producto'}>Agregar nuevo producto</Link></li>
                </ul>

                <li>Cerrar Sesión</li>
            </ul>
        </nav>
    </aside>
  )
}

export default Sidebar