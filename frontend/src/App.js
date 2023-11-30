/*import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Login from './components/Login'
import Notes from './components/Notes'


function App() {
  const [isLogin, setIsLogin] = useState(false)
  

  useEffect(() =>{
    const checkLogin = async () =>{
      const token = localStorage.getItem('tokenStore')
      if(token){
        const verified = await axios.get('/users/verify',{
          headers:{ Authorization: token}
        })
        console.log(verified)
        setIsLogin(verified.data)
        if(verified.data === false) return localStorage.clear()
      }else{
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <div className="App">
      {
        isLogin 
        ? <Notes setIsLogin={setIsLogin} userInfo={userInfo} /> 
        : <Login setIsLogin={setIsLogin} />
      }
    </div>
  );
}

export default App;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Notes from './components/Notes';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Definir el estado para userInfo

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        try {
          // Verificar el token
          const verified = await axios.get('/users/verify', {
            headers: { Authorization: token }
          });

          if (verified.data) {
            setIsLogin(true);
            // Obtener la información del usuario autenticado
            const userRes = await axios.get('/users/username', { // Asegúrate de que esta ruta coincida con tu backend
              headers: { Authorization: token }
            });
            setUserInfo(userRes.data); // Actualizar el estado con los datos del usuario
          } else {
            setIsLogin(false);
            localStorage.clear();
          }
        } catch (error) {
          console.error(error);
          setIsLogin(false);
          localStorage.clear();
        }
      }
    };

    checkLogin();
  }, []);

  return (
    <div className="App">
      {isLogin ? (
        <Notes setIsLogin={setIsLogin} userInfo={userInfo} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;

