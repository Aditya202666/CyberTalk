import express from 'express';
import authToken from '../middlewares/authToken.middleware.js';
import { getAllConversations, startConversation } from '../controllers/conversation.controller.js';

const router = express.Router();

router.get('/getAllConversations', authToken, getAllConversations)

router.post('/startConversation/:id', authToken, startConversation)

// delete conversation
// add members to conversation
// remove members from conversation



export default router;