// Importaciones necesarias de React y Axios.
import React, {useState} from 'react';
import axios from 'axios';

export default function Login({setIsLogin}) {
    // Estado para manejar la información del usuario y los errores.
    const [user, setUser] = useState({name: '',email: '',password: '' });
    const [err, setErr] = useState('');

    // Función para manejar los cambios en los campos de entrada.
    const onChangeInput = e =>{
        const {name, value} = e.target;
        // Actualiza el estado del usuario cuando cambia un campo de entrada.
        setUser({...user, [name]:value});
        // Resetea los mensajes de error cuando se edita un campo.
        setErr('');
    };

    // Función para manejar el envío del formulario de registro.
    const registerSubmit = async e =>{
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario.
        try {
            // Hace una petición POST para registrar al usuario.
            const res = await axios.post('https://mern-stacksd-backend.onrender.com/users/register',{
                username: user.name,
                email: user.email,
                password: user.password
            });
            // Resetea el formulario y muestra un mensaje.
            setUser({name: '', email: '', password: ''});
            setErr(res.data.msg);
        } catch (err) {
            // Muestra un mensaje de error si falla el registro.
            err.response.data.msg && setErr(err.response.data.msg);
        }
    };

    // Función para manejar el envío del formulario de inicio de sesión.
    const loginSubmit = async e =>{
        e.preventDefault();
        try {
            // Hace una petición POST para iniciar sesión.
            const res = await axios.post('https://mern-stacksd-backend.onrender.com/users/login',{
                email: user.email,
                password: user.password
            });
            // Almacena el token en localStorage y actualiza el estado de autenticación.
            localStorage.setItem('tokenStore', res.data.token);
            setIsLogin(true);
        } catch (err) {
            // Muestra un mensaje de error si falla el inicio de sesión.
            err.response.data.msg && setErr(err.response.data.msg);
        }
    };

    // Estado y estilo para alternar entre los formularios de registro e inicio de sesión.
    const [onLogin, setOnLogin] = useState(false);
    const style = {
        visibility: onLogin ? "visible" : "hidden",
        opacity: onLogin ? 1 : 0
    };

    // Renderiza los formularios de inicio de sesión y registro.
    return (
       <section className="login-page">
           <div className="login create-note">
                <h2>Login</h2>
                <form onSubmit={loginSubmit}>
                    <input type="email" name="email" id="login-email"
                    placeholder="Email" required value={user.email}
                    onChange={onChangeInput} />

                    <input type="password" name="password" id="login-password"
                    placeholder="Password" required value={user.password}
                    autoComplete="true"
                    onChange={onChangeInput} />

                    <button type="submit">Login</button>
                    <p>You don't have an account?
                        <span onClick={() => setOnLogin(true)}> Register Now</span>
                    </p>
                    <h3>{err}</h3>
                </form>
           </div>
           <div className="register create-note" style={style}>
           <h2>Register</h2>
                <form onSubmit={registerSubmit}>
                    <input type="text" name="name" id="register-name"
                    placeholder="User Name" required value={user.name}
                    onChange={onChangeInput} />

                    <input type="email" name="email" id="register-email"
                    placeholder="Email" required value={user.email}
                    onChange={onChangeInput} />

                    <input type="password" name="password" id="register-password"
                    placeholder="Password" required value={user.password}
                    autoComplete="true" onChange={onChangeInput} />

                    <button type="submit">Register</button>
                    <p>You have an account?
                        <span onClick={() => setOnLogin(false)}> Login Now</span>
                    </p>
                    <h3>{err}</h3>
                </form>
           </div>
       </section>
    )
}
