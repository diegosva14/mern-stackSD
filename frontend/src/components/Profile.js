// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [profileImage, setProfileImage] = useState(null);
    const [biography, setBiography] = useState('');
    const [currentProfileImage, setCurrentProfileImage] = useState('');
    const [currentBiography, setCurrentBiography] = useState('');
  
    useEffect(() => {
      // Función para cargar la información actual del usuario
      const loadUserProfile = async () => {
        try {
          const response = await axios.get('/api/user/profile', {
            headers: {
              // Asegúrate de incluir el token de autorización si es necesario
            }
          });
          if (response.data) {
            setCurrentProfileImage(response.data.profilePicture);
            setCurrentBiography(response.data.bio);
          }
        } catch (error) {
          console.error("Error al cargar el perfil del usuario", error);
        }
      };
  
      loadUserProfile();
    }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePicture', profileImage);
    formData.append('bio', biography);
  
    try {
        const token = localStorage.getItem('tokenStore');
      const response = await axios.post('https://mern-stacksd-backend.onrender.com/api/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Asegúrate de enviar el token de autenticación
        }
      });
      console.log(response.data);
      // Actualiza la UI según sea necesario
    } catch (error) {
      console.error(error);
    }
}

  return (
    <div>
      <h1>My Profile</h1>
      {/* Muestra la imagen actual del usuario */}
      {currentProfileImage && (
        <img src={currentProfileImage} alt="Profile" />
      )}
      {/* Muestra la biografía actual del usuario */}
      <p>{currentBiography}</p>

      <form onSubmit={handleProfileUpdate}>
        {/* ... campos de formulario ... */}
      </form>
    </div>
  );
}

export default Profile;
