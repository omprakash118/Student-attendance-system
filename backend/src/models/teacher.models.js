const mongoose = require('mongoose');

const { v4: uuidv4 } = require('uuid');


// Address Sub Schemas
const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    addressLine2: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
});


// Teacher Schema 
const teacherSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    Firstname : { first : String , required : true },
    Lastname : { type : String},
    email : { type : String , required :true },
    mobilePhone : { type : Number, required : true},
    officePhone : { type : Number, required : true },
    subjects : { type : String , required : true},
    coustomSubjects : { type : String , required : true},
    address : { type : addressSchema , required : true},
    bioNotes: { type: String, default: '' },
}, {timestamps : true});


const teacher = mongoose.model('Teacher' , teacherSchema);
module.exports = teacher;