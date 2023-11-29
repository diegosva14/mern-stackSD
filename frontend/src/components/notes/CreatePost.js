import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function CreatePost() {
    const [post, setPost] = useState({
        title: '',
        content: ''
    });
    const history = useHistory();

    const onChangeInput = e => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const createPost = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const { title, content } = post;
                const newPost = {
                    title, 
                    content
                };

                await axios.post('/api/posts', newPost, {
                    headers: { Authorization: token }
                });

                history.push('/');
            }
        } catch (err) {
            console.error(err);
            window.location.href = "/";
        }
    };

    return (
        <div className="create-post">
            <h2>Create Post</h2>
            <form onSubmit={createPost} autoComplete="off">
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={post.title} id="title"
                    name="title" required onChange={onChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" value={post.content} id="content"
                    name="content" required rows="10" onChange={onChangeInput} />
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    );
}
