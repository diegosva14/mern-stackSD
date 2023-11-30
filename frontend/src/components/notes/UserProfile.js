import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const { username } = useParams();
    const [userProfile, setUserProfile] = useState({
      bio: '',
      profilePicture: '',
      // Incluye otros campos que necesites
    });
  
    useEffect(() => {
      // Aquí deberías realizar una petición para obtener los datos del usuario
      // setUserProfile con la respuesta obtenida
    }, [username]);
  
    // ... funciones para manejar la actualización de la foto y la biografía ...
  
    return (
      <div className="user-profile">
        <img src={userProfile.profilePicture} alt="Foto de perfil" />
        <p>{userProfile.bio}</p>
        {/* Botones o formularios para cambiar la foto y la biografía */}
      </div>
    );
  };
  
  export default UserProfile;
