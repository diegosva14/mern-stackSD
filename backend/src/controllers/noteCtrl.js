const Notes = require('../models/noteModel')

const noteCtrl = {
    getPosts: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: -1 });
            res.json(posts);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createPost: async (req, res) => {
        try {
            const { title, content } = req.body;
            const newPost = new Post({
                title,
                content,
                user: {
                    id: req.user.id,
                    name: req.user.name
                }
            });
            await newPost.save();
            res.json({ msg: "Created a Post" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteNote: async(req, res) =>{
        try {
            await Notes.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateNote: async(req, res) =>{
        try {
            const {title, content, date} = req.body;
            await Notes.findOneAndUpdate({_id: req.params.id},{
                title,
                content,
                date
            })
            res.json({msg: "Updated a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    likePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            // Comprobar si el post ya ha sido likeado por este usuario
            if (post.likes.includes(req.user.id)) {
                // Si ya tiene like, deslikear
                const index = post.likes.indexOf(req.user.id);
                post.likes.splice(index, 1);
            } else {
                // Si no, dar like
                post.likes.push(req.user.id);
            }
            await post.save();
            res.json({ msg: "Liked/Unliked a Post" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    commentOnPost: async (req, res) => {
        try {
            const { comment } = req.body;
            const post = await Post.findById(req.params.id);
            post.comments.push({
                user: req.user.id,
                text: comment,
                date: new Date() // Opcional, ya que estamos utilizando timestamps
            });
            await post.save();
            res.json({ msg: "Commented on a Post" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getNote: async(req, res) => {
        try {
            const note = await Notes.findById(req.params.id)
            res.json(note)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = noteCtrl