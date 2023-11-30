// UserProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('tokenStore');
        if (token) {
          const response = await axios.get('https://mern-stacksd-backend.onrender.com/user/profile', {
            headers: { Authorization: token }
          });
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <img src={userProfile.profilePicture} alt="Profile" />
      <h1>{userProfile.username}</h1>
      <p>{userProfile.bio}</p>
      {/* Añade aquí la lógica para cambiar la foto y la biografía si es necesario */}
    </div>
  );
}

