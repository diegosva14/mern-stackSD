
const router = require('express').Router()
// Importamos el middleware de autenticación 'auth' para proteger las rutas.
const auth = require('../middleware/auth')
// Importamos el controlador de notas que contiene la lógica de negocio para cada ruta.
const noteCtrl = require('../controllers/noteCtrl')


router.route('/')
    .get(auth, noteCtrl.getNotes) // Ruta GET protegida que requiere autenticación, para obtener todas las notas.
    .post(auth, noteCtrl.createNote) // Ruta POST protegida para crear una nueva nota.


router.route('/:id')
    .get(auth, noteCtrl.getNote) // Ruta GET para obtener una nota específica por su ID.
    .put(auth, noteCtrl.updateNote) // Ruta PUT para actualizar una nota específica.
    .delete(auth, noteCtrl.deleteNote) // Ruta DELETE para eliminar una nota.


router.route('/:id/like')
    .put(auth, noteCtrl.likeNote); // Ruta PUT para actualizar el estado de 'like' de la nota.


router.route('/:id/comments')
    .post(auth, noteCtrl.addComment); // Ruta POST para añadir un nuevo comentario a la nota.


module.exports = router
