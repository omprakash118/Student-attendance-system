const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        type : String , 
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
    refreshToken: { 
        type: String, 
        default: ''     
    },
}, {timestamps : true});

// It is used to hash the password before saving it to the database
// It is a middleware function that is called before saving the document to the database
teacherSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bycrypt.hash(this.password, 10);
    next();
})


// Use to check if the password is correct
teacherSchema.methods.isPasswordCorrect = async function(password){
    return await bycrypt.compare(password, this.password);
}

// Use to generate access JWT token for the user
teacherSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            Firstname: this.Firstname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Use to generate refresh JWT token for the user
teacherSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




const teacher = mongoose.model('Teacher' , teacherSchema);
module.exports = teacher;