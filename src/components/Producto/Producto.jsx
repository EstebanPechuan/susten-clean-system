import React from 'react'
import './Producto.css'

function Producto({data}) {
  return (
    <div className="producto">
        <h2>{data.producto}</h2>
        <img src={data.img} alt={data.producto} />
        <p>{data.descripcion}</p>
    </div>
  )
}

export default Producto