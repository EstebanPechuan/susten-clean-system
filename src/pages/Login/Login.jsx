import './Login.css'
import { useState, useContext } from 'react'
import { AuthContext } from "../../context/AuthContext";
import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {dispatch} = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault()
    
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            dispatch({type: "LOGIN", payload: user})
            navigate("/productos")
        })
        .catch((error) => {
            setError(true)
        });
    }
    
    return (
        <div className="formulario">
            <form onSubmit={handleLogin}>
                <h1>Susten Clean</h1>
                <p>Login</p>

                <input type="email" placeholder='email' onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />

                {error && <span className='error'>Email o Contraseña incorrectas</span>}

                <button type='submit'>Ingresar</button>
            </form>
        </div>
    )
}

export default Login