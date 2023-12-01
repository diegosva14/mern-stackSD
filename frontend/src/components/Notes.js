// Importaciones de React y componentes necesarios, así como las herramientas de enrutamiento de react-router-dom.
import React from 'react';
import Header from './notes/Nav';
import Home from './notes/Home';
import CreateNote from './notes/CreateNote';
import EditNote from './notes/EditNote';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Definición del componente funcional Notes. Recibe dos props: setIsLogin para manejar el estado de autenticación y userInfo con la información del usuario.
export default function Notes({setIsLogin, userInfo}) {
    // Router envuelve el layout principal para habilitar el enrutamiento en la aplicación.
    return (
        <Router>
            <div className="notes-page">
                {/* Header es el componente que contiene la navegación. Recibe setIsLogin y userInfo como props para su funcionamiento. */}
                <Header setIsLogin={setIsLogin} userInfo={userInfo} />
                {/* La sección contiene las rutas que definen las páginas de la sección de notas y qué componente se debe renderizar en cada ruta. */}
                <section>
                    {/* La ruta principal ("/") renderiza el componente Home, que muestra la lista de notas. */}
                    <Route path="/" component={Home} exact />
                    {/* La ruta "/create" renderiza el componente CreateNote, que permite crear una nueva nota. */}
                    <Route path="/create" component={CreateNote} exact />
                    {/* La ruta "/edit/:id" renderiza el componente EditNote, que permite editar una nota existente. El ":id" es un parámetro de la ruta. */}
                    <Route path="/edit/:id" component={EditNote} exact />
                </section>
            </div>
        </Router>
    );
}
