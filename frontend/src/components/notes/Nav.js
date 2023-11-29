import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ setIsLogin }) {

    const logoutSubmit = () => {
        localStorage.clear();
        setIsLogin(false);
    }

    return (
        <header>
            <div className="logo">
                {/* Actualiza el nombre y la ruta según sea necesario */}
                <h1><Link to="/">MERN Social</Link></h1>
            </div>
            <ul>
                {/* Actualiza las rutas y los nombres para que coincidan con tu nueva aplicación */}
                <li><Link to="/">Newsfeed</Link></li>
                <li><Link to="/create">New Post</Link></li>
                <li onClick={logoutSubmit}><Link to="/">Logout</Link></li>
                {/* Podrías agregar un enlace al perfil del usuario si tienes esa funcionalidad */}
                <li><Link to="/profile">My Profile</Link></li>
            </ul>
        </header>
    )
}

