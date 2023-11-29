import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';

export default function Newsfeed() {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');

    const getPosts = async (token) => {
        const res = await axios.get('https://mern-stacksd-backend.onrender.com/api/posts', {
            headers: { Authorization: token }
        });
        setPosts(res.data);
    }

    useEffect(() => {
        const token = localStorage.getItem('tokenStore');
        setToken(token);
        if (token) {
            getPosts(token);
        }
    }, []);

    const deletePost = async (id) => {
        try {
            if (token) {
                await axios.delete(`https://mern-stacksd-backend.onrender.com/api/posts/${id}`, {
                    headers: { Authorization: token }
                });
                getPosts(token);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="post-wrapper">
            {
                posts.map(post => (
                    <div className="card" key={post._id}>
                        <h4 title={post.title}>{post.title}</h4>
                        <div className="text-wrapper">
                            <p>{post.content}</p>
                        </div>
                        <p className="date">{format(post.createdAt)}</p> {/* Asumiendo que estás usando timestamps en el modelo de Mongoose */}
                        <div className="card-footer">
                            {post.user.name} {/* Asegúrate de que el modelo de post incluya esta información */}
                            {/* Implementa las acciones de like y comentario aquí */}
                        </div>
                        <button className="close" onClick={() => deletePost(post._id)}>X</button>
                    </div>
                ))
            }
        </div>
    );
}
