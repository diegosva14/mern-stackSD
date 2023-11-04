
const mongoose = require('mongoose');
const URI = process.env.MONGODB_CONNECT_URI
    ? process.env.MONGODB_CONNECT_URI
    : 'mongodb+srv://diego:x5N97p4UGzRwHlsf@cluster0.wnjcwri.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(URI,{
    useNewUrlParser: true,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB is connected');
});



module.exports = mongoose;


//dsoto66
//33ADv3EgWf3BxiMZ