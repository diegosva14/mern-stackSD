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
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        lowercase: true,
        
      },
    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)