import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'

export default function Home() {
    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')

    const getNotes = async (token) =>{
        const res = await axios.get('https://mern-stacksd-backend.onrender.com/api/notes', {
            headers:{Authorization: token}
        })
        setNotes(res.data)
    }

    useEffect(() =>{
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getNotes(token)
        }
    }, [])

    const deleteNote = async (id) =>{
        try {
            if(token){
                await axios.delete(`https://mern-stacksd-backend.onrender.com/api/notes/${id}`, {
                    headers: {Authorization: token}
                })
                getNotes(token)
            }
        } catch (error) {
            window.location.href = "/";
        }
    }

    const likeNote = async (noteId) => {
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                // Suponiendo que tu endpoint solo necesita saber qué nota "likear"
                // y que se encarga de incrementar el número de "likes" internamente.
                await axios.put(`https://mern-stacksd-backend.onrender.com/api/notes/${noteId}/like`, {}, {
                    headers: { Authorization: token }
                });
    
                // Aquí deberías actualizar el estado para reflejar el cambio en la interfaz de usuario.
                // Esto dependerá de cómo estés manejando el estado en tu componente.
                // Por ejemplo, si tienes un estado que contiene todas las notas, podrías hacer algo así:
                setNotes(prevNotes => prevNotes.map(note => 
                    note._id === noteId ? { ...note, likes: note.likes + 1 } : note
                ));
            }
        } catch (err) {
            console.error('Error al dar like a la nota', err);
            // Aquí deberías manejar el error, por ejemplo, mostrando un mensaje al usuario.
        }
    }
    

    return (
       
        <div className="note-wrapper">
  {notes.map(note => (
    <div className="card" key={note._id}>
      <h4 title={note.title}>{note.title}</h4>
      <div className="text-wrapper">
        <p>{note.content}</p>
      </div>
      <p className="date">{format(note.createdAt)}</p>
      <div className="card-footer">
        {note.name}
        {/* Aquí se añade el botón que llama a toggleLike cuando se hace clic */}
        <button className="like-button" onClick={() => toggleLike(note._id)}>
          👍 {note.likes}
        </button>
      </div>
      <button className="close" onClick={() => deleteNote(note._id)}>X</button>
    </div>
  ))}
</div>

    )
}
