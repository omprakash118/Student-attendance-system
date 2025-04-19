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