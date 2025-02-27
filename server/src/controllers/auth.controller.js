import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import userModel from "../models/user.model.js"
import emailTransporter from '../config/nodeMailer.config.js'
import { generateRandomPassword, isUsernameValid } from '../utils/functions.js'

const JWT_KEY = process.env.JWT_KEY
const ONE_DAY = 1000 * 60 * 60 * 24
export const TOKEN_NAME = 'Bubbles'



export const registerUser = async(req, res)=>{

    const {userName, email, password} = req.body
    if(!userName || !email || !password) return res.json({success: false, message:` All fields are required.`})
    if(password.length < 6 ) return res.json({success: false, message:`Password must be at least 6 characters.`})


    if(!isUsernameValid(userName)) return res.json({success: false, message:`Invalid username. Only alphanumeric characters, underscores and hyphens are allowed.`})
 
    try {

        const existingUser = await userModel.findOne({email})
        if(existingUser) return res.json({success:false, message:`User already exists. Please login`})

        const hashedPassword = await bcrypt.hash(password,10)
        const profileAvatar = `https://robohash.org/${userName}`

        const user = new userModel({userName, email, avatar:profileAvatar , password:hashedPassword})
        await user.save();

        const jwtToken = jwt.sign({id:user._id}, JWT_KEY, {expiresIn: '3d'})
        res.cookie(TOKEN_NAME, jwtToken, {
            maxAge: ONE_DAY  * 3,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.SAME_SITE
        })

        return res.json({success: true, message: `User registered successfully`, data:{
            userName: user.userName, 
            email:user.email, 
            avatar: user.avatar,
            emailVerified: user.emailVerified
        }})
        
    } catch (error) {

        console.log(`error in registerUser: ${error.message}`)
        return res.json({success: false, message: error.message})
        
    }
}

export const loginUser = async(req, res) =>{

    const {userName, password} = req.body
    if(!userName ||!password) return res.json({success: false, message:` All fields required.`})

    try {

        const user = await userModel.findOne({userName})
        if(!user) return res.json({success: false, message:`Invalid Credentials.`})
        
        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword) return res.json({success: false, message:`Invalid Credentials.`})

        const jwtToken = jwt.sign({id:user._id}, JWT_KEY, {expiresIn: '3d'})
        res.cookie(TOKEN_NAME, jwtToken, {
            maxAge: ONE_DAY  * 3,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.SAME_SITE
        })

        return res.json({success: true, message: `User logged in successfully.`, data:{
            userName: user.userName, 
            email:user.email, 
            avatar: user.avatar,
            emailVerified: user.emailVerified
        }})
        
        
    } catch (error) {

        console.log(`error in loginUser: ${error.message}`)
        return res.json({success: false, message: error.message})
    }
}

export const logoutUser = async(req, res) =>{

    try {
        
        res.clearCookie(TOKEN_NAME)
        return res.json({success: true, message: `User logged out successfully.`})
        
    } catch (error) {

        console.log(`error in logoutUser: ${error.message}`)
        return res.json({success: false, message: error.message})

    }

}

export const authUser = async(req, res)=>{

    const user = req.user

    try {
        
        return res.json({success:true, message:`User verified.`, data:{
            userName: user.userName, 
            email:user.email, 
            avatar: user.avatar,
            emailVerified: user.emailVerified
        }})
        
    } catch (error) {

        console.log(`error in authUser: ${error.message}`)
        return res.json({success: false, message: error.message})

    }
}


export const sendEmailVerificationOtp = async(req, res)=>{

    const user = req.user;

    try {

        if(user.emailVerified) return res.json({success: true, message:`User is Already verified.`})

        if(user.lastOtpSent > Date.now()) return res.json({
            success:false, 
            message:`Please wait ${Math.round((user.lastOtpSent - Date.now())/1000)} seconds.`
        })

        const otp = String(Math.floor(Math.random()*900000) + 100000)
        user.emailVerificationOtp = otp
        user.emailVerificationOtpExpiry = Date.now() + (10 * 60 * 1000) // 10 minutes
        user.lastOtpSent = Date.now() + (30 * 1000) // 30 seconds
        await user.save()
        
        // Send OTP to user email
        await emailTransporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Email Verification OTP',
            text: `Your verification OTP is: ${otp}. OTP will expire in 10 Minutes.`
        })

        return res.json({success: true, message:`OTP sent to user's email successfully.`})
        
    } catch (error) {

        console.log(`error in sendEmailVerificationOtp: ${error.message}`)
        return res.json({success: false, message: error.message})
    }
}

export const verifyEmailOtp = async(req, res) => {

    const { otp } = req.body;
    const user =req.user;

    if(!otp) return res.json({success:false, message:`Please enter your OTP.`})

    try {
        
        if(user.emailVerificationOtpExpiry < Date.now()) return res.json({success:false, message:`OTP Expired.`})    
        if(user.emailVerificationOtp!== otp) return res.json({success: false, message:`Incorrect OTP.`})

        user.emailVerified = true
        user.emailVerificationOtp = ''
        user.emailVerificationOtpExpiry = 0
        user.lastOtpSent = 0
        await user.save()

        return res.json({success: true, message:`Email verified successfully.`})
        
    } catch (error) {

        console.log(`error in verifyEmailOtp: ${error.message}`)
        return res.json({success: false, message: error.message})

    }
}

//for forgot password
export const sendForgotPasswordOtp = async(req, res)=>{

    const {email} = req.body;

    try {

        const user =  await userModel.findOne({email})
        if(!user) return res.json({success: false, message:`User not found.`})

        if(user.lastOtpSent > Date.now()) return res.json({
            success:false, 
            message:`Please wait ${Math.round((user.lastOtpSent - Date.now())/1000)} seconds before resending OTP`
        })

        const otp = String(Math.floor(Math.random()*900000) + 100000)
        user.forgotPasswordOtp = otp
        user.forgotPasswordOtpExpiry = Date.now() + (10 * 60 * 1000) // 10 minutes
        user.lastOtpSent = Date.now() + (30 * 1000) // 30 seconds

        await user.save()
        
        // Send OTP to user email
        await emailTransporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Email Verification OTP',
            text: `Your Password Reset OTP is: ${otp}. OTP will expire in 10 Minutes.`
        })

        return res.json({success: true, message:`OTP sent to user's email successfully.`})
        
    } catch (error) {

        console.log(`error in sendForgotPasswordOtp: ${error.message}`)
        return res.json({success: false, message: error.message})
    }
}

export const verifyForgotPasswordOtp = async(req, res) => {

    const {email, otp} = req.body;
    if(!otp || !email) return res.json({success:false, message:`Please enter all fields.`})

    try {

        const user = await userModel.findOne({email})
        if(!user) return res.json({success: false, message:`User not found.`})
        
        if(user.forgotPasswordOtpExpiry < Date.now()) return res.json({success:false, message:`OTP Expired.`})    
        if(user.forgotPasswordOtp!== otp) return res.json({success: false, message:`Incorrect OTP.`})
        
        const newPassword = generateRandomPassword(10)
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        user.forgotPasswordOtp = ''
        user.forgotPasswordOtpExpiry = 0
        user.lastOtpSent = 0
        await user.save()

        await emailTransporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset Successful',
            text: `Your new password is: ${newPassword}. Please change it as soon as possible.`
        })
        // const jwtToken = jwt.sign({id:user._id}, JWT_KEY, {expiresIn: '3d'})
        // res.cookie(TOKEN_NAME, jwtToken, {
        //     maxAge: ONE_DAY  * 3,
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.SAME_SITE
        // })

        return res.json({success: true, message:`Password reset successful. Password sent to user"s email. `})
        
    } catch (error) {

        console.log(`error in verifyForgotPasswordOtp: ${error.message}`)
        return res.json({success: false, message: error.message})

    }
}

export const changePassword = async(req, res) => {

    const { oldPassword, newPassword} = req.body;
    const user = req.user
    if(!newPassword) return res.json({success: false, message:`Please enter your new password`})

    try {

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
        if(!isPasswordCorrect) return res.json({success: false, message:`Incorrect password.`})
        
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()
        
        return res.json({success: true, message:`Password changed successfully`})
        
    } catch (error) {

        console.log(`error in changePassword: ${error.message}`)
        return res.json({success: false, message: error.message})
        
    }
}

