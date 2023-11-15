const notesCtrl = {};
const Note = require('../models/Note');

notesCtrl.createNote = async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.id; // Obtener el userId del token JWT
  
      const newNote = new Note({
        title,
        content,
        userId,
      });
  
      const savedNote = await newNote.save();
      res.status(201).json(savedNote);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  notesCtrl.getNotesByUser = async (req, res) => {
    try {
      const userId = req.user.id; // Obtener el userId del token JWT
  
      const userNotes = await Note.find({ userId });
      res.status(200).json(userNotes);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
};
notesCtrl.createNote = async (req, res) => {
    console.log('entre', req.body);
    const {title, content, date, author} = req.body;
    const newNote = new Note({title,content,date,author});
    console.log("nueva nota: ",newNote);
    await newNote.save();
    res.json({message: 'Note Saved'});
};


notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    console.log(note);
    res.json(note);
};

notesCtrl.updateNote = async (req, res) => {
    const { title, content, author } = req.body;
    await Note.findOneAndUpdate({_id: req.params.id}, {
        title,
        author,
        content
    });
    console.log(req.params.id, req.body);
    res.json({message: 'Note Updated'});
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({message: 'Note Deleted'})
};

module.exports = notesCtrl;

