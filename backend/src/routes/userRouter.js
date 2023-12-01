const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const multer = require('multer');
const auth = require('../middleware/auth')

// Configura multer aquí mismo si es necesario
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

// Register User
router.post('/register', userCtrl.registerUser)
// Login User
router.post('/login', userCtrl.loginUser)

// verify Token
router.get('/verify', userCtrl.verifiedToken)

router.post('/profile', auth, upload.single('profilePicture'), userCtrl.updateProfile);
router.get('/profile', auth, userCtrl.getProfile);




module.exports = router