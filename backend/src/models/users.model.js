const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:[ 
        {
            type : Schema.Types.ObjectId,
            ref : 'Student'
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6, 
        select: false 
    },
    typeofUser: {
        type: String,
        enum: ['Student', 'Teacher', 'Admin'],
        required: [true, 'User type is required'],
    },
}, { timestamps: true });




// It is used to hash the password before saving it to the database
// It is a middleware function that is called before saving the document to the database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bycrypt.hash(this.password, 10);
    next();
})


// Use to check if the password is correct
userSchema.methods.isPasswordCorrect = async function(password){
    return await bycrypt.compare(password, this.password);
}

// Use to generate access JWT token for the user
userSchema.methods.generateAccessToken = function(){
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
userSchema.methods.generateRefreshToken = function(){
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


const userSchema = mongoose.model('User', userSchema);
module.exports = userSchema;