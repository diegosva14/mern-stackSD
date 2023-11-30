const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    }
  });

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String,
        required: true
    },
    comments: [commentSchema],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    name:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

  module.exports = mongoose.model('Comments', commentSchema)
module.exports = mongoose.model('Notes', noteSchema)
