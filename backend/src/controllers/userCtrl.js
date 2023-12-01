// Importaciones de los módulos necesarios.
const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    // Función para registrar un nuevo usuario.
    registerUser: async (req, res) =>{
        try {
            const {username, email, password} = req.body;
            // Verificar si el correo electrónico ya está registrado.
            const user = await Users.findOne({email: email})
            if(user) return res.status(400).json({msg: "The email already exists."})

            // Encriptar la contraseña antes de guardarla en la base de datos.
            const passwordHash = await bcrypt.hash(password, 10)
            // Crear un nuevo usuario con la contraseña encriptada.
            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash
            })
            // Guardar el nuevo usuario en la base de datos.
            await newUser.save()
            res.json({msg: "Sign up Success"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // Función para iniciar sesión de un usuario.
    loginUser: async (req, res) =>{
        try {
            const {email, password} = req.body;
            // Verificar si el usuario existe en la base de datos.
            const user = await Users.findOne({email: email})
            if(!user) return res.status(400).json({msg: "User does not exist."})

            // Comparar la contraseña ingresada con la almacenada en la base de datos.
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

            // Si las credenciales son correctas, generar un token de JWT.
            const payload = {id: user._id, name: user.username}
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1d"})

            // Devolver el token al cliente.
            res.json({token})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // Función para verificar si un token es válido.
    verifiedToken: (req, res) => {
        try {
            const token = req.header("Authorization");
            if (!token) return res.status(401).json({ verified: false });

            jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
                if (err) return res.status(401).json({ verified: false });

                // Obtener el usuario correspondiente al token y excluir la contraseña.
                const user = await Users.findById(verified.id).select('-password');
                if (!user) return res.status(404).json({ verified: false });

                // Confirmar que el token es válido y devolver la confirmación y el ID del usuario.
                return res.json({ verified: true, id: user._id });
            });
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
  
}

// Exportar el controlador para usarlo en las rutas.
module.exports = userCtrl
