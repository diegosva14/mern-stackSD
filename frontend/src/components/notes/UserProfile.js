import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState({
    bio: '',
    profilePicture: '',
  });

  useEffect(() => {
    // Obtén los datos del perfil del usuario
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(`https://mern-stacksd-backend.onrender.com/api/user/${username}`);
        setProfile(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, [username]);

  // ... manejo de la actualización del perfil ...

  return (
    <div>
      {/* Formulario para mostrar y actualizar la foto de perfil y la biografía */}
      <img src={profile.profilePicture} alt={`${username}'s profile`} />
      <p>{profile.bio}</p>
      {/* ... resto del formulario para actualizar ... */}
    </div>
  );
};

export default UserProfile;
