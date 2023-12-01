// Importaciones necesarias de React, Axios y react-router-dom para la navegación.
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

export default function EditNote({match}) {
    // Estado para manejar la información de la nota.
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    });
    // useHistory se utiliza para la navegación programática.
    const history = useHistory();

    // Efecto para obtener la nota actual cuando el componente se monta o cuando cambia el ID de la nota.
    useEffect(() =>{
        const getNote = async () =>{
            const token = localStorage.getItem('tokenStore');
            // Comprueba si hay un ID de nota en los parámetros de la URL.
            if(match.params.id){
                // Realiza una petición GET para obtener los detalles de la nota.
                const res = await axios.get(`https://mern-stacksd-backend.onrender.com/api/notes/${match.params.id}`, {
                    headers: {Authorization: token}
                });
                // Establece los detalles de la nota en el estado.
                setNote({
                    title: res.data.title,
                    content: res.data.content,
                    date: new Date(res.data.date).toLocaleDateString(),
                    id: res.data._id
                });
            }
        };
        getNote();
    },[match.params.id]);

    // Maneja los cambios en los campos del formulario.
    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value});
    };

    // Función para manejar el envío del formulario de edición.
    const editNote = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if(token){
                // Prepara la nueva información de la nota para enviarla.
                const {title, content, date, id} = note;
                const newNote = { title, content, date };

                // Realiza una petición PUT para actualizar la nota.
                await axios.put(`https://mern-stacksd-backend.onrender.com/api/notes/${id}`, newNote, {
                    headers: {Authorization: token}
                });
                
                // Redirecciona al usuario a la página principal después de la actualización.
                return history.push('/');
            }
        } catch (err) {
            // Redirige al usuario si hay un error.
            window.location.href = "/";
        }
    };

    return (
        <div className="create-note">
            <h2>Edit Note</h2>
            <form onSubmit={editNote} autoComplete="off">
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={note.title} id="title"
                    name="title" required onChange={onChangeInput} />
                </div>

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
    )
}
