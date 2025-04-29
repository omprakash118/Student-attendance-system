const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    Title : {type : String,},
    audience: { type: String, enum: ['All', 'Teachers', 'Students'], default: 'All' },
    description: { type: String },
    dateIssued: { type: Date, default: Date.now }, 
    files : [{
        fileName : { type : String },
        fileUrl : { type : String }
    }],

}, {timestamps : true})


const Notice = mongoose.model('Notice' , noticeSchema);
module.exports = Notice;