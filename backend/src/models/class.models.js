const mongoose = require('mongoose');


const classes = new mongoose.Schema({
    className : { type : String , required : true, unique : true},
    subject : {  type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
} , { timestamps: true });


const Class = mongoose.model('Class' , classes);
module.exports = Class;
