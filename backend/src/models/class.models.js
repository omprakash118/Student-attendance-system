const mongoose = require('mongoose');
const Student = require('./student.models.js'); 

const classes = new mongoose.Schema({
    className : { type : String , required : true, unique : true},
    subjects: [
        {
          subjectName: { type: String, required: true },
          teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }
        }
    ],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
} , { timestamps: true });


classes.post('save', async function (doc, next) {
  try {
    if (doc.students && doc.students.length > 0) {
      await Student.updateMany(
        { _id: { $in: doc.students } },
        { $set: { classAssigned: doc._id } }
      );
    }
    next();
  } catch (err) {
    next(err); // Important for error propagation
  }
});

classes.post('findOneAndDelete', async function (doc, next) {
  try {
    if (doc && doc.students && doc.students.length > 0) {
      await Student.updateMany(
        { _id: { $in: doc.students } },
        { $set: { classAssigned: null } } // or { $set: { classAssigned: null } }
      );
    }
    next();
  } catch (err) {
    next(err);
  }
});


const Classes = mongoose.model('Classes' , classes);
module.exports = Classes;


