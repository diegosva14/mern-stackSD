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

    const toggleLike = async (noteId) => {
        try {
          // Llamada al endpoint para incrementar el contador de likes
          const response = await axios.put(`/api/notes/${noteId}/like`);
          // Actualiza el estado de las notas con el nuevo conteo de likes
          setNotes(notes.map(note => {
            if (note._id === noteId) {
              return { ...note, likes: response.data };
            }
            return note;
          }));
        } catch (error) {
          console.error('Error al dar like a la nota', error);
          // Manejo de errores
        }
      };

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
