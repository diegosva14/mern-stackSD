const router = require('express').Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/postCtrl'); // Asegúrate de que el nombre del archivo controlador sea correcto

// Rutas para obtener y crear posts
router.route('/')
    .get(auth, postCtrl.getPosts) // Todos los usuarios pueden ver posts de otros usuarios
    .post(auth, postCtrl.createPost); // Crear un nuevo post

// Rutas para un post específico: obtener, actualizar y eliminar
router.route('/:id')
    .get(auth, postCtrl.getPost) // Obtener un post específico
    .put(auth, postCtrl.updatePost) // Actualizar un post específico
    .delete(auth, postCtrl.deletePost); // Eliminar un post específico

// Ruta para dar like a un post
router.patch('/:id/like', auth, postCtrl.likePost); // Usar PATCH ya que es una actualización parcial

// Rutas para comentar en un post
router.route('/:id/comment')
    .post(auth, postCtrl.commentOnPost) // Añadir un comentario a un post
    // Opcional: agregar rutas para editar y eliminar comentarios

module.exports = router;
