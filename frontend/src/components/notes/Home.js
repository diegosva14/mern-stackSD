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

    return (
        <div className="container">
    {notes.map(note => (
      <div className="note-card" key={note._id}>
        <div className="note-header">
          <h2>{note.name} - {note.title}</h2>
          <button onClick={() => deleteNote(note._id)}>X</button>
        </div>
        <p>{note.content}</p>
        <div className="note-footer">
          <span>{formatDate(note.createdAt)}</span>
          <button onClick={() => editNote(note._id)}>Edit</button>
        </div>
      </div>
    ))}
  </div>
    )
}
