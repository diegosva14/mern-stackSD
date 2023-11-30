const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

// Register User
router.post('/register', userCtrl.registerUser)
// Login User
router.post('/login', userCtrl.loginUser)

// verify Token
router.get('/verify', userCtrl.verifiedToken)

// Ruta para actualizar la biografía del usuario
router.put('/bio', auth, userCtrl.updateBio);

// Ruta para actualizar la foto de perfil del usuario
router.put('/profile-picture', auth, userCtrl.updateProfilePicture);

// Ruta para obtener la información del usuario por username
router.get('/:username', auth, userCtrl.getUserByUsername);


module.exports = router