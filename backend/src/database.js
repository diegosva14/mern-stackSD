
const mongoose = require('mongoose');

const uri = 'mongodb+srv://diego:x5N97p4UGzRwHlsf@cluster0.wnjcwri.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri).then(db => console.log('db is conected')).catch(err => console.log(err));


module.exports = mongoose;


//dsoto66
//33ADv3EgWf3BxiMZ