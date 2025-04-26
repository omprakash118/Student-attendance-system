const mongoose = require('mongoose');

const attendanceDataSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true,
    }
}, { _id: false });

const attendanceSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    attendanceData: {
        type: [attendanceDataSchema],
        required: true,
    }
},  { timestamps: true });


const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;