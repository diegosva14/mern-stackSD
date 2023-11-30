// UserProfile.js
import React from 'react';

export default function UserProfile({ userInfo }) {
  return (
    <div className="user-profile">
      <img src={userInfo.profilePicture} alt={`${userInfo.username}'s profile`} />
      <h1>{userInfo.username}</h1>
      <p>{userInfo.bio}</p>
      {/* Formulario para cambiar la foto y la biografía si es necesario */}
    </div>
  );
}
