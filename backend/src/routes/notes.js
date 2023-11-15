const { Router } = require('express');
const router = Router();
const { getNotes, createNote, getNote, updateNote, deleteNote } = require('../controllers/notes.controller');
const authenticate = require('../middlewares/authMiddleware');
router.route('/')
    .get(getNotes)
    .post(createNote)
router.route('/:id')
    .get(getNote)
    .put(updateNote)
    .delete(deleteNote)
router.post('/create', authenticate, notesController.createNote);
router.get('/user', authenticate, notesController.getNotesByUser);
module.exports = router;