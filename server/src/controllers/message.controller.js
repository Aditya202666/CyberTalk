import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.config.js";
import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";
import { getSocketId, io } from "../config/socket.io.config.js";

export const getMessages = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const userToChatId = new mongoose.Types.ObjectId(req.params.id);

        const messages = await messageModel.find({
            $or: [
                { senderId: userId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: userId }
            ]
        }).sort({ createdAt: 1 }); // Sort messages by time

        return res.json({ success: true, message: 'Messages retrieved', data: messages });        
    } catch (error) {

        console.log(`error in getMessages ${error.message}`)
        return res.json({success: false, message: error.message})
        
    }

}
export const sendMessage = async (req, res) => {
    
    const { text, image, username } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;


    try {
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = cloudinary.url(uploadResponse.public_id, {
                transformation: [
                    { quality: "auto", fetch_format: "auto" },
                    { width: 1200 },
                ],
            });
        }

        // Save the new message
        const message = new messageModel({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        const savedMessage =  await message.save();

        //send message to web socket
        const receiverSocketId = getSocketId(username)
        io.to(receiverSocketId).emit("newMessage", req.user.userName, savedMessage);

        // Update both sender & receiver to add each other as friends (ensuring no duplicates)
        await userModel.bulkWrite([
            {
                updateOne: {
                    filter: { _id: senderId, "friends.friendId": { $ne: receiverId } },
                    update: { $push: { friends: { friendId: receiverId, lastMessage: null } } },
                }
            },
            {
                updateOne: {
                    filter: { _id: receiverId, "friends.friendId": { $ne: senderId } },
                    update: { $push: { friends: { friendId: senderId, lastMessage: null } } },
                }
            },
            {
                updateOne: {
                    filter: { _id: senderId, "friends.friendId": receiverId },
                    update: { $set: { "friends.$.lastMessage": message._id } }
                }
            },
            {
                updateOne: {
                    filter: { _id: receiverId, "friends.friendId": senderId },
                    update: { $set: { "friends.$.lastMessage": message._id } }
                }
            }
        ]);

        return res.json({ success: true, data: message, message: `Message sent successfully.` });
    } catch (error) {
        console.log(`error in sendMessage: ${error.message}`);
        return res.status(500).json({ success: false, message: error.message });
    }
};
   
export const deleteMessage = async(req, res) =>{

    const userId = req.user._id
    const {messageId} = req.body

    try {
        // todo: this should only work if the message is sent from user
        const message = await messageModel.findById(messageId)

        if(message.senderId === userId) {
            await message.deleteOne()
            return res.json({success: true, message:`Message deleted successfully.`})
        }
        return res.json({success: false, message:`Can't delete others message.`})
        
    } catch (error) {
        
    }

}