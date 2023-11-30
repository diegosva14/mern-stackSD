const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //trim: true,
        //match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        //lowercase: true,
        // Aquí podrías añadir validación de email con una expresión regular.
      },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: '',
      },
    profilePicture: {
        type: String,
        default: '../assets/profile-pic.png'
      }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)