// Profile.js
import React, { useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [biography, setBiography] = useState('');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profilePicture', profileImage);
    formData.append('bio', biography);
  
    try {
      const response = await axios.post('https://mern-stacksd-backend.onrender.com/api/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${tuToken}` // Asegúrate de enviar el token de autenticación
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
      <form onSubmit={handleProfileUpdate}>
        <input
          type="file"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        <textarea
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
