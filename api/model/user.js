const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    firstName : {type: String},
    lastName : {type: String},
    mobile : {type: Number},
    emailid : {type : String},
    password : {type : String}
});

module.exports = mongoose.model('User', userSchema);