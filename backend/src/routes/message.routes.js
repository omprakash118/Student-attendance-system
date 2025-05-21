const Router = require('express');

const router = Router();

const {
    sendMessage,
    getAllMessages,
    getMessageById,
    deleteMessage
} = require('../controllers/message.controller.js');

router.post('/send', sendMessage);           // Send a message
router.get('/', getAllMessages);            // Get all messages 
router.get('/:id', getMessageById);         // Get a message by ID
router.delete('/:id', deleteMessage);      // Delete a message by ID

module.exports = router;