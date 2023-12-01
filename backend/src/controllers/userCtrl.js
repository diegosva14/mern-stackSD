const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    verifiedToken: (req, res) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ verified: false });

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
            if (err) return res.status(401).json({ verified: false });

            const user = await Users.findById(verified.id).select('-password');
            if (!user) return res.status(404).json({ verified: false });

            return res.json({ verified: true, id: user._id }); // Devolver el ID del usuario
        });
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
},
  
}


module.exports = userCtrl