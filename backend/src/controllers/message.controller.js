const Message = require("../models/message.model.js");
const Classes = require("../models/class.models.js");
const Student = require("../models/student.models.js");
const Teacher = require("../models/teacher.models.js");

// It is use to send message to students, class-students and teacher
// async function sendMessage(req, res) {
//     try {
//         const { recipientType, studentName, teacherName, subject, messageBody } = req.body;

//         // Validation
//         if (!recipientType || !subject || !messageBody) {
//           return res.status(400).json({ message: 'Required fields are missing.' });
//         }

//         if (
//           (recipientType === 'students' || recipientType === 'class-students') &&
//           !studentName
//         ) {
//           return res.status(400).json({ message: 'Student name is required.' });
//         }

//         if (recipientType === 'teacher' && !teacherName) {
//           return res.status(400).json({ message: 'Teacher name is required.' });
//         }

//         const message = new Message({
//           recipientType,
//           studentName,
//           teacherName,
//           subject,
//           messageBody
//         });

//         await message.save();

//         res.status(201).json({ message: 'Message sent successfully.', data: message });
//   } catch (err) {
//     console.error('Error sending message:', err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// }; 


async function sendMessage(req, res) {
  try {
    const {
      senderId,
      senderRole,
      senderName,
      recipientId,
      recipientRole,
      recipientName,
      subject,
      messageBody
    } = req.body;

    // Validation
    if (!senderId || !senderRole || !recipientId || !recipientRole || !subject || !messageBody) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    const message = new Message({
      sender: {
        id: senderId,
        role: senderRole,
        name: senderName || '' // optional
      },
      recipient: {
        id: recipientId,
        role: recipientRole,
        name: recipientName || ''
      },
      subject,
      messageBody
    });

    await message.save();
    res.status(201).json({ message: 'Message sent successfully.', data: message });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ message: 'Server error.' });
  }
}


// It is use to get all messages
// async function getAllMessages(req, res) {
//   try {
//     const messages = await Message.find().sort({ sentAt: -1 }); // Newest first
//     res.status(200).json({ count: messages.length, data: messages });
//   } catch (err) {
//     console.error('Error fetching messages:', err);
//     res.status(500).json({ message: 'Server error.' });
//   }
// }

async function getAllMessages(req, res) {
  try {
    const { userId, role } = req.query;

    let filter = {};
    if (userId && role) {
      filter = {
        $or: [
          { 'sender.id': userId, 'sender.role': role },
          { 'recipient.id': userId, 'recipient.role': role }
        ]
      };
    }

    const messages = await Message.find(filter).sort({ sentAt: -1 });
    res.status(200).json({ count: messages.length, data: messages });
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Server error.' });
  }
}



// It is use to get all messages by recipient Id
async function getMessageById(req, res) {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found.' });
    }
    res.status(200).json({ data: message });
    }
    catch (err) {
        console.error('Error fetching message:', err);
        res.status(500).json({ message: 'Server error.' });
    }
}

// It is use to delete message by id
async function deleteMessage(req, res) {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found.' });
    }
    res.status(200).json({ message: 'Message deleted successfully.' });
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({ message: 'Server error.' });
  }
}

module.exports = {
    sendMessage,
    getAllMessages,
    getMessageById,
    deleteMessage
};