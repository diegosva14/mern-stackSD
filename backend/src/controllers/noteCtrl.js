const Notes = require('../models/noteModel')

const noteCtrl = {
    /*getNotes: async (req, res) =>{
        try {
            const notes = await Notes.find({user_id: req.user.id})
            res.json(notes)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },*/
    getNotes: async (req, res) => {
        try {
          const notes = await Notes.find({}).sort({ createdAt: -1 }); // Ordena por el campo 'createdAt' de manera descendente
          res.json(notes)
        } catch (err) {
          return res.status(500).json({msg: err.message});
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
   /* deleteNote: async (req, res) => {
        try {
          // Buscar la nota para obtener el user_id
          const note = await Notes.findById(req.params.id);
          // Comprobar si la nota pertenece al usuario autenticado
          if (note.user_id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
          }
      
          await note.remove();
          res.json({ msg: 'Deleted a Note' });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },*/
      
    deleteNote: async(req, res) =>{
        try {
            await Notes.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    /*updateNote: async(req, res) =>{
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
    },*/
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
          // Verifica si el usuario ya ha dado "like"
          if (note.likes.includes(req.user.id)) {
            // Si es así, quitar el "like"
            note.likes.pull(req.user.id);
          } else {
            // Si no, añadir el "like"
            note.likes.push(req.user.id);
          }
          await note.save();
          res.json(note);
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      }
      
}

module.exports = noteCtrl