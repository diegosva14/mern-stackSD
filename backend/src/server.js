require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const path = require('path')


const app = express()
app.use(cors())
app.use(express.json())


// Routes
app.use('/users', userRouter)
app.use('/api/posts', postRouter)


// Connect to MongoDB
const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://localhost/databasetest';
mongoose.connect(URI, {
    
    useNewUrlParser: true,
   
}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB is now connected!');
});


// Listen Server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})