import express from 'express';
import authToken from '../middlewares/authToken.middleware.js';
import { changeAvatar, changeUsername, checkIsUsernameTaken, getAllFriends, searchUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/getAllFriends', authToken, getAllFriends)

router.get("/searchUsers/:searchTerm", authToken, searchUsers)

router.post('/checkIsUsernameTaken', checkIsUsernameTaken)

router.put('/changeUsername', authToken, changeUsername)
router.put('/changeAvatar', authToken, changeAvatar)


export default router