import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ContextApp } from "../../context/Context";
import { BsArrowLeft } from 'react-icons/bs'
import './Detalle.css'
import Sidebar from '../../components/Sidebar/Sidebar';

function Detalle() {
  const data = useContext(ContextApp)
  const { id } = useParams()

  console.log(id);

  const index = data.findIndex(item => item.id === id)

  console.log(data[index].producto, data[index].categoria);

  return (
    <>
      <Sidebar />
      
      <section className='detalle'>
        <Link to={'/productos'} className="volver">
          <BsArrowLeft />
          Volver
        </Link>

        <div className="info">
          <img src={data[index].img} alt={data[index].producto} />

          <div className="detalleProducto">
            <h2>{data[index].producto}</h2>
            <p>{data[index].descripcion}</p>
            <p className='capitalize'>{data[index].categoria}</p>

            <div className="precios">
              <div className="caja">
                <h4>Caja / Pack</h4>
                <p>{`$${data[index].caja}`}</p>
              </div>

              <div className="envase">
                <h4>Envase</h4>
                <p>{`$${data[index].envase}`}</p>
              </div>

              <div className="litro">
                <h4>Litro</h4>
                <p>{`$${data[index].litro}`}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Detalle