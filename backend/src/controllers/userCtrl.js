const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer');

// Configura multer para la carga de imágenes
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/'); // Asegúrate de que este directorio existe o multer dará error
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Usamos Date.now() para evitar nombres de archivo duplicados
    }
  });
  
  const upload = multer({ storage: storage });
const userCtrl = {
    registerUser: async (req, res) =>{
        try {
            const {username, email, password} = req.body;
            const user = await Users.findOne({email: email})
            if(user) return res.status(400).json({msg: "The email already exists."})

            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash
            })
            await newUser.save()
            res.json({msg: "Sign up Success"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    loginUser: async (req, res) =>{
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({email: email})
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

            // if login success create token
            const payload = {id: user._id, name: user.username}
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1d"})

            res.json({token})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    verifiedToken: (req, res) =>{
        try {
            const token = req.header("Authorization")
            if(!token) return res.send(false)

            jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) =>{
                if(err) return res.send(false)

                const user = await Users.findById(verified.id)
                if(!user) return res.send(false)

                return res.send(true)
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    } ,
    updateProfile : async (req, res) => {
        try {
          // Encuentra el usuario basado en el id del usuario proporcionado por el middleware de autenticación
          const user = await Users.findById(req.user._id);
      
          // Si se proporcionó una biografía, actualízala
          if(req.body.bio) {
            user.bio = req.body.bio;
          }
      
          // Si se subió una imagen, actualiza la ruta de la imagen de perfil
          // Asegúrate de tener el nombre del campo del formulario para la imagen de perfil igual al argumento pasado a .single()
          if(req.file) {
            user.profilePicture = req.file.path;
          }
      
          // Guarda el usuario actualizado
          await user.save();
      
          // Envía una respuesta exitosa con el usuario actualizado
          res.status(200).json(user);
        } catch (error) {
          // Si hay un error, envía una respuesta de error
          res.status(500).json({ message: error.message });
        }
  
    }
}




module.exports = userCtrl