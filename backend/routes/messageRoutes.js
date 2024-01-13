const express = require("express")
const {authMiddleware} = require('../middleware/userMiddleware')
const {sendMessage, getMessage} = require('../controller/messageController')
const message = express.Router();

message.post('/send', authMiddleware ,sendMessage);
message.post('/', authMiddleware ,getMessage);

module.exports = message