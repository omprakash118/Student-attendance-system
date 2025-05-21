// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   recipientType: {
//     type: String,
//     enum: ['students', 'class-students', 'teacher'],
//     required: true
//   },
//   studentName: {
//     type: String,
//     required: function() {
//       return this.recipientType === 'students' || this.recipientType === 'class-students';
//     }
//   },
//   teacherName: {
//     type: String,
//     required: function() {
//       return this.recipientType === 'teacher';
//     }
//   },
//   subject: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   messageBody: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   sentAt: {
//     type: Date,
//     default: Date.now
//   }
// });


// const Message= mongoose.model('Message', messageSchema);
// module.exports = Message;



const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'sender.role'  // Dynamically reference Admin, Teacher, or Student model
    },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      required: true
    },
    name: { // Optional, for quick reads without joins
      type: String
    }
  },
  recipient: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'recipient.role'
    },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      required: true
    },
    name: { // Optional
      type: String
    }
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  messageBody: {
    type: String,
    required: true,
    trim: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
