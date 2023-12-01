import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav({setIsLogin}) {

    const logoutSubmit = () =>{
        localStorage.clear()
        setIsLogin(false)
    }
//Es el navegador que se muestra en la parte superior de la pagina
    return (
        <header>
            <div className="logo">
                <h1><Link to="/">SOCIAL MERN</Link></h1>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">ADD POST</Link></li>
                <li onClick={logoutSubmit}><Link to="/">Logout</Link></li>
            </ul>
        </header>  
    )
}
