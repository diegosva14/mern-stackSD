import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const { username } = useParams();
    const [userProfile, setUserProfile] = useState({
      bio: '',
      profilePicture: '',
      // Incluye otros campos que necesites
    });
    const [newBio, setNewBio] = useState('');
    const [image, setImage] = useState('');
    const history = useHistory();

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          // Suponiendo que tienes una ruta de API para obtener datos de usuario por username
          const response = await axios.get(`https://mern-stacksd-backend.onrender.com/api/users/${username}`);
          setUserProfile(response.data);
          setNewBio(response.data.bio);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Manejar el error, por ejemplo redirigiendo a login si el usuario no está autenticado
        }
      };

      fetchUserData();
    }, [username]);

    const handleBioChange = (e) => {
      setNewBio(e.target.value);
    };

    const handleBioSubmit = async (e) => {
      e.preventDefault();
      try {
        // Suponiendo que tienes una ruta de API para actualizar la biografía
        await axios.put(`https://mern-stacksd-backend.onrender.com/api/users/${username}/bio`, { bio: newBio });
        setUserProfile(prevState => ({ ...prevState, bio: newBio }));
      } catch (error) {
        console.error('Error updating bio:', error);
        // Manejar el error adecuadamente
      }
    };

    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };

    const handleImageSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('image', image);

      try {
        // Suponiendo que tienes una ruta de API para actualizar la imagen del perfil
        const response = await axios.put(`https://mern-stacksd-backend.onrender.com/api/users/${username}/profile-picture`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUserProfile(prevState => ({ ...prevState, profilePicture: response.data.profilePicture }));
      } catch (error) {
        console.error('Error updating profile picture:', error);
        // Manejar el error adecuadamente
      }
    };

    return (
      <div className="user-profile">
        <form onSubmit={handleImageSubmit}>
          <img src={userProfile.profilePicture || 'default-profile.png'} alt={`${username}'s profile`} />
          <input type="file" onChange={handleImageChange} />
          <button type="submit">Cambiar foto</button>
        </form>
        
        <form onSubmit={handleBioSubmit}>
          <textarea value={newBio} onChange={handleBioChange} />
          <button type="submit">Cambiar biografía</button>
        </form>
      </div>
    );
};

export default UserProfile;
