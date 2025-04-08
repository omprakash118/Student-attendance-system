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


// Stundent Schema 
const studentSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    Firstname : { first : String , required : true },
    Lastname : { type : String},
    email : { type : String , required :true },
    mobilePhone : { type : Number, required : true},
    parentsPhone : { type : Number, required : true },
    address : { type : addressSchema , required : true},
    classAssigned : { type : String , required : true},
    bioNotes: { type: String, default: '' },
}, {timestamps : true});


const student = mongoose.model('Student' , studentSchema);
module.exports = student;