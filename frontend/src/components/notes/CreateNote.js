import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'


export default function CreateNote() {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: ''
    })
    const history = useHistory()

    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value})
    }


    const createNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title, content, date} = note;
                const newNote = {
                    title, content, date
                }

                await axios.post('https://mern-stacksd-backend.onrender.com/api/notes', newNote, {
                    headers: {Authorization: token}
                })
                
                return history.push('/')
            }
        } catch (err) {
            window.location.href = "/";
        }
    }

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
          content: `Ingredients: ${coctelData.ingredients.join(', ')}`,
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
      <p>¡Agrega un cóctel! Escribe el nombre en el título y haz clic en "Agregar Cóctel".</p>
    </div>
        <div className="create-note">
            <h2>Add Recipe</h2>
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

                <label htmlFor="date">Date: {note.date} </label>
                <div className="row">
                    <input type="date" id="date"
                    name="date" onChange={onChangeInput} />
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
        </div>
    )
}
