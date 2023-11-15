
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://localhost/databasetest';

    mongoose.connect(URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err =>{
        if(err) throw err;
        console.log('Connected to MongoDB')
    })

//mongoose.connect(URI).then(db => console.log('db is conected')).catch(err => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB is connected');
});