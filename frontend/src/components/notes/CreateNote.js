// Importaciones necesarias de React, Axios y react-router-dom.
import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

export default function CreateNote() {
    // Estado para manejar la información de la nota.
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: ''
    });
    // useHistory se utiliza para la navegación programática.
    const history = useHistory();

    // Maneja los cambios en los campos de entrada del formulario.
    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value});
    };

    // Función para manejar el envío del formulario de creación de nota.
    const createNote = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if(token){
                const {title, content, date} = note;
                const newNote = { title, content, date };

                // Realiza una petición POST para crear una nueva nota.
                await axios.post('https://mern-stacksd-backend.onrender.com/api/notes', newNote, {
                    headers: {Authorization: token}
                });
                
                // Redirecciona al usuario a la página principal después de la creación.
                return history.push('/');
            }
        } catch (err) {
            // Redirige al usuario si hay un error.
            window.location.href = "/";
        }
    };

    // Función para agregar información de un cóctel a la nota.
    const agregarCoctel = async () => {
        try {
          const apiKey = 'dP7RmCevDceoicjgI+YU2Q==HnojcP8u9Ydzl4vo';
          const { title } = note;
          const response = await axios.get(`https://api.api-ninjas.com/v1/cocktail?name=${encodeURIComponent(title)}`, {
            headers: { 'X-Api-Key': apiKey }
          });
          
          console.log(response.data); // Agrega esta línea 
        

    // Verifica si la respuesta es un array y si tiene al menos un objeto
    if (Array.isArray(response.data) && response.data.length > 0) {
      const coctelData = response.data[0];

      if (coctelData && coctelData.name && coctelData.ingredients) {
        setNote({
          ...note,
          title: coctelData.name,
          content: `Hola! aqui estan los ingredientes que necesitas para la bebida ${coctelData.name}: ${coctelData.ingredients.join(', ')}`,
        });
      } else {
        console.error('La respuesta de la API de cócteles no tiene el formato esperado.');
      }
    } else {
      console.error('La respuesta de la API de cócteles no es un array o no contiene elementos.');
    }
  } catch (error) {
    console.error('Error al obtener la receta del cóctel:', error.message);
  }
};
    return (
        <div>
    <div className="create-note">
      <p>¡Agrega un cóctel! Escribe el nombre del cocten en ingles en el título y haz clic en "Agregar Cóctel".</p>
    </div>
        <div className="create-note">
            <h2>Add Note</h2>
            <form onSubmit={createNote} autoComplete="off">
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={note.title} id="title"
                    name="title" required onChange={onChangeInput} />
                </div>
                <button type="button" onClick={agregarCoctel}>
                Agregar Cóctel
                 </button>
                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" value={note.content} id="content"
                    name="content" required rows="10" onChange={onChangeInput} />
                </div>

               

                <button type="submit">Save</button>
            </form>
        </div>
        </div>
    )
}
