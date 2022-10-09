import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextApp } from '../../context/Context'
import Producto from '../../components/Producto/Producto'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Productos.css'
import { FiSearch } from "react-icons/fi";

function Productos() {
    const datos = useContext(ContextApp)
    const [lista, setLista] = useState(datos)
    const [filtro, setFiltro] = useState('')
    const [categoria, setCategoria] = useState('todos')

    useEffect(() => {
        // console.log('Se ha filtrado'
    }, [lista])

    useEffect(() => {
        if (filtro !== '' && categoria === 'todos') {
            setLista(datos.filter(item => item.producto.toLowerCase().includes(filtro.toLowerCase())))
        } else if (filtro === '' && categoria !== 'todos') {
            setLista(datos.filter(item => item.categoria.toLowerCase().includes(categoria.toLowerCase())))
        } else if (filtro !== '' && categoria !== 'todos') {
            setLista(datos.filter(item => item.producto.toLowerCase().includes(filtro.toLowerCase()) &&
            item.categoria.toLowerCase().includes(categoria.toLowerCase())))
        } else {
            setLista(datos)
        }
        
    }, [filtro, categoria])

    const handleChange = (e) => {
        setFiltro(e.target.value)
    }

    const handleSelect = (e) => {
        setCategoria(e.target.value)
    }
    
    return (
        <>
            <Sidebar />
            
            <section className='productos'>
                <div className="filtros">
                    <div className="input">
                        <label htmlFor="filtro"><FiSearch /></label>
                        <input placeholder='Buscar producto' id='filtro' type="text" onChange={handleChange} />
                    </div>

                    <div className="select">
                        <select name="" id="select" onChange={handleSelect}>
                            <option value="todos">Todos</option>
                            <option value="higiene de manos">Higiene de manos</option>
                            <option value="limpieza general">Limpieza general</option>
                        </select>
                    </div>
                </div>
                
                <div className="lista-productos">
                    {lista.map(item => {
                        return (
                            <Link key={item.id} to={`/productos/${item.id}`}>
                                <Producto data={item} />
                            </Link>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default Productos