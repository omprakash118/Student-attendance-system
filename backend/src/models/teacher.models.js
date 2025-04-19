const mongoose = require('mongoose');


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
    Firstname : { 
        first : String , 
        required : true 
    },
    Lastname : { 
        type : String
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
        select: false 
    },
    email : { 
        type : String , 
        required :true  
    },
    mobilePhone : { 
        type : Number, 
        required : true
        
    },
    officePhone : { 
        type : Number, 
        required : true 
        
    },
    subjects : { 
        type : String , 
        required : true
        
    },
    coustomSubjects : { 
        type : String , 
        required : true
        
    },
    address : { 
        type : addressSchema , 
        required : true
        
    },
    bioNotes: { 
        type: String, 
        default: '' 
        
    },
}, {timestamps : true});


const teacher = mongoose.model('Teacher' , teacherSchema);
module.exports = teacher;