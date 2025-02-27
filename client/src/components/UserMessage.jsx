import React from "react";
import { useAuthStore } from "../store/authStore";
import { formatMessageTime } from "../lib/formatMessageTime";

const UserMessage = ({text, image, timestamp}) => {

    const {authUser} = useAuthStore()
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full border-2 border-accent">
          <img
            alt="Tailwind CSS chat bubble component"
            src={authUser.avatar}
          />
          
        </div>
      </div>
      <div className="chat-header">
        {authUser.userName}
      </div>
      <div className="chat-bubble">
        <img className="max-w-32 rounded-lg mb-1" src={image} alt="" />
        <p>{text}</p>
      </div>
      <time className="chat-footer text-xs opacity-50">{formatMessageTime(timestamp)}</time>
    </div>
  );
};

export default UserMessage;
