
const mongoose = require('mongoose');

const uri = MONGO_CONNECT_URI;
mongoose.connect(uri).then(db => console.log('db is conected')).catch(err => console.log(err));


module.exports = mongoose;


//dsoto66
//33ADv3EgWf3BxiMZ