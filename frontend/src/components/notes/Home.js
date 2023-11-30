import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'

export default function Home() {
    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')
    const [comments, setComments] = useState([]);

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
            const response = await axios.put(`https://mern-stacksd-backend.onrender.com/api/notes/${noteId}/like`, {}, {
              headers: { Authorization: token }
            });
      
            // Actualiza el estado de las notas
            setNotes(notes.map(note => {
                if (note._id === noteId) {
                  // Asumiendo que el backend devuelve la cantidad de likes actualizada
                  return { ...note, likes: Array(response.data.likes).fill(undefined) };
              }
              return note;
            }));
          }
        } catch (err) {
          console.error('Error al dar like a la nota', err);
          // Manejo de errores adecuado aquí
        }
      };
      
      const submitComment = async (e, noteId) => {
        e.preventDefault();
        const commentText = e.target.elements.commentInput.value; // Obtén el valor del input del formulario
        try {
          const token = localStorage.getItem('tokenStore');
          if (token) {
            const response = await axios.post(`https://mern-stacksd-backend.onrender.com/api/notes/api/notes/${noteId}/comments`, { text: commentText }, {
              headers: { Authorization: token }
            });
      
            // Actualizar el estado con el nuevo comentario
            setNotes(notes.map(note => {
              if (note._id === noteId) {
                return { ...note, comments: [...note.comments, response.data] };
              }
              return note;
            }));
            const newComment = {
                text: commentText,
                authorName: "NombreUsuario", // Reemplaza con el nombre de usuario real desde el estado o props
              };
              
              setComments([...comments, newComment]);
              e.target.elements.commentInput.value = '';
            e.target[0].value = ''; // Limpiar el input del comentario
          }
        } catch (err) {
          console.error('Error al enviar el comentario', err);
          // Manejo de errores adecuado aquí
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
        <button className="like-button" onClick={() => likeNote(note._id)}>
          👍 {note.likes?.length || 0}
        </button>
      </div>
      <button className="close" onClick={() => deleteNote(note._id)}>X</button>
      <div className="comments-section">
    {comments.map((comment, index) => (
      <div key={index} className="comment">
        {comment.authorName}: {comment.text}
      </div>
    ))}
  </div>
  <form onSubmit={(e) => submitComment(e, note._id)}>
    <input name="commentInput" type="text" placeholder="Escribe un comentario..." />
    <button type="submit">Comentar</button>
  </form>
    </div>
  ))}
</div>

    )
}
