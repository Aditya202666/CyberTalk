import express from 'express';
import dotenv from 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { connectDb } from './config/mongodb.config.js';
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import messageRouter from './routes/message.route.js'
import { app, httpServer } from './config/socket.io.config.js';

import path from "path" 


const port = process.env.PORT || 3212
const origin = process.env.ORIGIN ||  'http://localhost:5173'

const __dirname =  path.resolve()


connectDb()
 
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
    origin: [origin],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)   
app.use('/api/v1/user', userRouter) 
app.use('/api/v1/message', messageRouter)


// app.use(express.static(path.join(__dirname, "../client/dist")));

//   app.get("*", (req, res) => {
//     console.log('i am here')
//     res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
//   });
 

httpServer.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})
