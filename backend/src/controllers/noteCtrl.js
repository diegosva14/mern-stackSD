// Importación de modelo de notas para interactuar con la base de datos.
const Notes = require('../models/noteModel');

const noteCtrl = {
    // Obtener todas las notas con posibilidad de ordenar por fecha o likes.
    getNotes: async (req, res) => {
        try {
            // Preparar criterios de ordenación basados en la consulta.
            let sortCriteria = {};
            if (req.query.sort === '-createdAt') {
                sortCriteria = { createdAt: -1 };
            } else if (req.query.sort === '-likes') {
                sortCriteria = { 'likes.length': -1 };
            }
            // Obtener notas de la base de datos y devolverlas.
            const notes = await Notes.find().sort(sortCriteria);
            res.json(notes);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // Crear una nueva nota y asociarla con el usuario autenticado.
    createNote: async(req, res) =>{
        try {
            const {title, content, date} = req.body;
            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user.id, // ID del usuario obtenido del middleware de autenticación.
                name: req.user.name // Nombre del usuario obtenido del middleware de autenticación.
            });
            await newNote.save();
            res.json({msg: "Created a Note"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    // Eliminar una nota por ID. Solo el usuario que creó la nota puede eliminarla.
    deleteNote: async(req, res) =>{
        try {
            // Verificar si el usuario autenticado es el autor de la nota.
            const note = await Notes.findById(req.params.id);
            if (note.user_id === req.user.id) {
                await note.remove();
                res.json({msg: "Deleted a Note"});
            } else {
                res.status(401).json({msg: "Unauthorized"});
            }
        } catch (err) {
            return res.status(500).json({msg: err.message});
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
      
      // Obtener una nota específica por su ID.
    getNote: async(req, res) => {
        try {
            const note = await Notes.findById(req.params.id)
            res.json(note)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    // Manejar los 'likes' de una nota. Cualquier usuario autenticado puede dar o quitar un 'like'.
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
      // Añadir un comentario a una nota específica. Cualquier usuario autenticado puede comentar.
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