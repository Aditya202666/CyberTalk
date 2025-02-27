import express from 'express';
import authToken from '../middlewares/authToken.middleware.js';
import { deleteMessage, getMessages, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/getMessages/:id', authToken, getMessages)
router.post('/sendMessage/:id', authToken, sendMessage)  
router.put('/deleteMessage', authToken, deleteMessage)

export default router;