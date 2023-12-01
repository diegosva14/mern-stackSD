const Notes = require('../models/noteModel')

const noteCtrl = {

      getNotes: async (req, res) => {
        try {
            let sortCriteria = {};
            if (req.query.sort === '-createdAt') {
                sortCriteria = { createdAt: -1 };
            } else if (req.query.sort === '-likes') {
                sortCriteria = { likes: -1 };
            }
            const notes = await Notes.find().sort(sortCriteria);
            res.json(notes);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
      
    createNote: async(req, res) =>{
        try {
            const {title, content, date} = req.body;
            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name
            })
            await newNote.save()
            res.json({msg: "Created a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
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

    updateNote: async (req, res) => {
        try {
          const { title, content, date } = req.body;
          // Buscar la nota para obtener el user_id
          const note = await Notes.findById(req.params.id);
          // Comprobar si la nota pertenece al usuario autenticado
          if (note.user_id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
          }
      
          // Si el usuario es autorizado, actualizar la nota
          const updatedNote = await Notes.findByIdAndUpdate(
            req.params.id,
            { title, content, date },
            { new: true }
          );
      
          res.json(updatedNote);
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
    },

    likeNote: async (req, res) => {
        try {
          const note = await Notes.findById(req.params.id);
          const userId = req.user.id; // Asumiendo que req.user.id contiene el ID del usuario autenticado
      
          const index = note.likes.indexOf(userId);
          if (index > -1) {
            // Usuario ya dio like, quitar el like
            note.likes.splice(index, 1);
          } else {
            // Usuario no ha dado like, añadir el ID del usuario al arreglo de likes
            note.likes.push(userId);
          }
          await note.save();
          res.json({ likes: note.likes.length }); // Devuelve el conteo actualizado de likes
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      
      addComment: async (req, res) => {
        try {
          const note = await Notes.findById(req.params.id);
          const newComment = {
            text: req.body.text,
            author: req.user.id, // Asumiendo que req.user.id contiene el ID del usuario autenticado
            authorName: req.user.name, // Asumiendo que tienes el nombre del usuario disponible
          };
      
          note.comments.push(newComment);
          await note.save();
          res.json(newComment);
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      
}

module.exports = noteCtrl