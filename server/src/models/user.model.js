import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, maxlength:20 ,match: /^[a-zA-Z0-9_]+$/, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, minlength: 6, required: true },

    avatar: { type: String, default: "" },

    friends: [
      {
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
      },
    ],

  

    emailVerified: { type: Boolean, default: false },

    emailVerificationOtp: { type: String, default: "" },
    emailVerificationOtpExpiry: { type: Number, default: 0 },

    forgotPasswordOtp: { type: String, default: "" },
    forgotPasswordOtpExpiry: { type: Number, default: 0 },

    lastOtpSent: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);


export default userModel;
