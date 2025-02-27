import express from 'express';

import authToken from '../middlewares/authToken.middleware.js'
import { authUser, changePassword, loginUser, logoutUser, registerUser, sendEmailVerificationOtp, sendForgotPasswordOtp, verifyEmailOtp, verifyForgotPasswordOtp } from '../controllers/auth.controller.js';


const router  = express.Router();

router.post('/register', registerUser)

router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.get('/authUser', authToken, authUser)

router.post('/sendEmailVerificationOtp', authToken, sendEmailVerificationOtp)
router.post('/verifyEmailOtp', authToken, verifyEmailOtp)

router.post('/changePassword', authToken, changePassword)

router.post('/sendForgotPasswordOtp', sendForgotPasswordOtp)
router.post('/verifyForgotPasswordOtp', verifyForgotPasswordOtp)

 

 
export default router;