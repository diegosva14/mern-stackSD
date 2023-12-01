// Importaciones de React, Axios y los componentes Login y Notes.
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Login from './components/Login';
import Notes from './components/Notes';

// Definición del componente funcional App.
function App() {
  // Estado para controlar si el usuario está logueado.
  const [isLogin, setIsLogin] = useState(false);

  // Efecto que se ejecuta tras el renderizado del componente.
  useEffect(() =>{
    // Función asíncrona para verificar si el usuario está logueado.
    const checkLogin = async () =>{
      // Obtener el token de autenticación del almacenamiento local.
      const token = localStorage.getItem('tokenStore');
      // Si hay un token, verificarlo en el backend.
      if(token){
        const verified = await axios.get('/users/verify',{
          headers:{ Authorization: token}
        });
        console.log(verified); // Imprimir la respuesta del backend.
        // Establecer el estado de login en función de la respuesta.
        setIsLogin(verified.data);
        // Si la respuesta es false, limpiar el almacenamiento local.
        if(verified.data === false) return localStorage.clear();
      }else{
        // Si no hay token, establecer isLogin en false.
        setIsLogin(false);
      }
    };
    // Llamar a la función checkLogin.
    checkLogin();
  }, []);

  // Renderizar el componente Notes si el usuario está logueado, o el componente Login si no lo está.
  return (
    <div className="App">
      {
        isLogin 
        ? <Notes setIsLogin={setIsLogin}  /> // Pasar setIsLogin a Notes para poder modificar el estado de isLogin.
        : <Login setIsLogin={setIsLogin} /> // Pasar setIsLogin a Login por la misma razón.
      }
    </div>
  );
}

// Exportar el componente App para su uso en otros archivos.
export default App;
