import './Registro.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from 'react'

function Registro() {
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target[0].value);

    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
    }
    catch {
      setError(true)
    }
      
  }
  return (
    <div className="formulario">
        <form onSubmit={handleSubmit}>
            <h1>Susten Clean</h1>
            <p>Registro</p>

            <input type="text" placeholder='Nombre' />
            <input type="email" placeholder='Email' />
            <input type="password" placeholder='Password' />

            {/* <input type="submit" value="Ingresar" /> */}
            <button>Registrarse</button>

            { error && <span>Algo falló</span> }
        </form>
    </div>
  )
}

export default Registro