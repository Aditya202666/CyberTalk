import userModel from "../models/user.model.js";
import cloudinary from "../config/cloudinary.config.js";
import { isUsernameValid } from "../utils/functions.js";

export const getAllFriends = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await userModel
      .findById(userId)
      .populate({
        path: "friends.friendId",
        select: "userName avatar _id",
      })
      .populate({
        path: "friends.lastMessage",
        select: "text createdAt",
      });

    return res.json({ success: true, data: user.friends });
  } catch (error) {
    console.log(`error in getAllFriends: ${error.message}`);
    return res.json({ success: false, message: error.message });
  }
};

export const searchUsers = async (req, res) => {
  const { searchTerm } = req.params;
  try {
    const users = await userModel
      .find(
        { userName: { $regex: `${searchTerm}`, $options: "i" } } // Case-insensitive search
      )
      .select("userName avatar _id"); // Select only the required fields

    return res.json({ success: true, data: users }); // Returns an array of matching users with selected fields
  } catch (error) {
    console.log(`error in searchUsers: ${error.message}`);
    return res.json({ success: false, message: error.message });
  }
};

export const checkIsUsernameTaken = async (req, res) => {
  const { userName } = req.body;
  if (!userName)
    return res.json({ success: false, message: `Please enter a username` });

  try {
    const isUsernameTaken = await userModel.findOne({ userName });
    if (isUsernameTaken)return res.json({ success: false, message: `Username already exists.` });

    
    if (!isUsernameValid(userName))
      return res.json({
        success: false,
        message: `Invalid username. Only alphanumeric characters, underscores and hyphens are allowed.`,
      });

    return res.json({ success: true, message: `Username is available` });
  } catch (error) {
    console.log(`error in checkIsUsernameTaken: ${error.message}`);
    return res.json({ success: false, message: error.message });
  }
};

export const changeUsername = async (req, res) => {
  const { newUsername } = req.body;
  const user = req.user;
  if (!newUsername || newUsername === user.userName)
    return res.json({ success: false, message: `Please enter a new username` });

  try {
    user.userName = newUsername;
    await user.save();

    return res.json({
      success: true,
      message: `Username changed successfully`,
    });
  } catch (error) {
    console.log(`error in changeUsername: ${error.message}`);
    return res.json({ success: false, message: error.message });
  }
};

export const changeAvatar = async (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  if (!avatar)
    return res.json({ success: false, message: `Please provide an avatar.` });

  try {
    const uploadResponse = await cloudinary.uploader.upload(avatar);
    const url = cloudinary.url(uploadResponse.public_id, {
      transformation: [
        {
          quality: "auto",
          fetch_format: "auto",
        },
        {
          width: 1200,
        },
      ],
    });
    const user = await userModel.findByIdAndUpdate(
      userId,
      { avatar: url },
      { new: true }
    );

    return res.json({
      success: true,
      message: `Avatar Changed Successfully.`,
      data: user.avatar,
    });
  } catch (error) {
    console.log(`error in changeAvatar: ${error.message}`);
    return res.json({ success: false, message: error.message });
  }
};
