const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    isCompleted: {type:Boolean, default:false}
});

module.exports = mongoose.model('Task',taskSchema);