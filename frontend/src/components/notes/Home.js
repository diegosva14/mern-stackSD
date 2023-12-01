import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'

export default function Home() {
    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')
    const [comments, setComments] = useState([]);
    const [sortOrder, setSortOrder] = useState('newest');


    const getNotes = async (token, sort) => {
      let query = '?sort=';
      if (sort === 'newest') {
          query += '-createdAt';
      } else if (sort === 'mostLiked') {
          query += '-likes';
      }
      const res = await axios.get(`https://mern-stacksd-backend.onrender.com/api/notes${query}`, {
          headers:{Authorization: token}
      });
      setNotes(res.data);
  };

    useEffect(() =>{
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if (token) {
          getNotes(token, sortOrder);
      }
  }, [sortOrder]);

   // Función para manejar el cambio de ordenamiento
   const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
};

const deleteNote = async (id) => {
  if (window.confirm("¿Estás seguro de que quieres eliminar esta nota?")) {
      try {
          if (token) {
              await axios.delete(`https://mern-stacksd-backend.onrender.com/api/notes/${id}`, {
                  headers: { Authorization: token }
              });
              getNotes(token); // Actualizar la lista de notas después de la eliminación
          }
      } catch (error) {
          console.error("Error al eliminar la nota", error);
          // Aquí puedes manejar el error, como mostrar un mensaje al usuario
      }
  }
};


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
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
          // Añade una declaración de consola para asegurarte de que e.target es el formulario
        console.log(e.target);

        // Añade otra declaración de consola para verificar el elemento input específico
        console.log(e.target.elements.commentText);

  
        const commentText = e.target.elements.commentText.value; // Obtener el valor del campo de texto del comentario
        console.log(commentText); // Esto debería mostrar el texto del comentario
        try {
          const token = localStorage.getItem('tokenStore'); // Obtener el token de autenticación
          if (token) {
            // Crear el objeto de comentario
            const comment = {
              text: commentText, // El texto del comentario
            };
      
            // Enviar el comentario al backend
            const response = await axios.post(`https://mern-stacksd-backend.onrender.com/api/notes/${noteId}/comments`, comment, {
              headers: { Authorization: token}
            });
      
            // Actualizar el estado de la aplicación con el nuevo comentario
            // Asumiendo que tienes un estado llamado 'notes' que es un array con todas las notas
            setNotes(prevNotes => prevNotes.map(note => {
              if (note._id === noteId) {
                // Añadir el nuevo comentario a la lista de comentarios de la nota
                return {
                  ...note,
                  comments: [...note.comments, response.data]
                };
              }
              return note;
            }));
      
            // Limpiar el campo del formulario
            e.target.elements.commentText.value = '';
          }
        } catch (error) {
          console.error('Error al enviar el comentario', error);
          // Manejar los errores aquí, como mostrar un mensaje al usuario
        }
      };
      
      

    return (
    
    <div className="note-wrapper">
      <div> <h3>Ordenar Notas</h3><select onChange={(e) => handleSortChange(e.target.value)} value={sortOrder}>
                <option value="newest">Más nuevo primero</option>
                <option value="mostLiked">Más likes primero</option>
            </select></div>
  {notes.map(note => (
    
    <div className="card" key={note._id}>
      {note.name}
      <h4 title={note.title}>{note.title}</h4>
      <div className="text-wrapper">
        <p>{note.content}</p>
      </div>
      <p className="date">{format(note.createdAt)}</p>
      <div className="card-footer">
       
        {/* Aquí se añade el botón que llama a toggleLike cuando se hace clic */}
        <button className="like-button" onClick={() => likeNote(note._id)}>
          👍 {note.likes?.length || 0}
        </button>
        <span className="comment-count">💬 {note.comments.length}</span>
      </div>
      <button className="close" onClick={() => deleteNote(note._id)}>X</button>
      <div className="comments-section">
      <h3>Comentarios</h3>
      {note.comments.map((comment, index) => (
      <div key={comment._id} className="comment">
      {comment.authorName}: {comment.text || 'Sin texto'}
   </div>
))}

  </div>
  <form onSubmit={(e) => submitComment(e, note._id)}>
  <input name="commentText" type="text" placeholder="Escribe un comentario..." required />
    <button name="comment-button"type="submit">Comentar</button>
  </form>
    </div>
  ))}
</div>

    )
}