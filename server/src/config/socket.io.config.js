import express from 'express';
import http from 'http'
import dotenv from 'dotenv/config'
import {Server} from 'socket.io'


const app = express();
const httpServer = http.createServer(app);

const onlineUsersMap = new Map();

export const getSocketId = (username)=>{
    return onlineUsersMap.get(username) || null;
}

const io = new Server(httpServer, { cors: { origin: process.env.ORIGIN } });

io.on('connection', (userSocket)=>{

        // console.log('user connected', userSocket.id, userSocket.handshake.query.username)
        onlineUsersMap.set(userSocket.handshake.query.username, userSocket.id)
        // console.log(onlineUsersMap)

        io.emit('getOnlineUsers', Array.from(onlineUsersMap.entries()))
        
        userSocket.on('disconnect', ()=>{
            // console.log('user disconnected', userSocket.id)
            onlineUsersMap.delete(userSocket.handshake.query.username)
            io.emit('getOnlineUsers', Array.from(onlineUsersMap.entries()))
        })
})
 

export {app, io, httpServer}