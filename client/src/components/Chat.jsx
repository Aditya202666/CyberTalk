import React, { useEffect, useRef } from "react";
import { ArrowLeft, ImageIcon, Plus, Send } from "lucide-react";
import FriendMessage from "./FriendMessage";
import UserMessage from "./UserMessage";
import MessageInput from "./MessageInput";
import { useMessageStore } from "../store/messageStore";
import { useThemeStore } from "../store/themeStore";
import { useWebSocketStore } from "../store/webSocketStore";

const Chat = () => {
  const { selectedFriend, isSelectedFriend, removeSelectedFriend, messages } =
    useMessageStore();
  const { isHovering } = useThemeStore();
 const { onlineUsers } = useWebSocketStore();

 const messageViewRef = useRef()

  const handleBackClick = () => {
    removeSelectedFriend();

  }

  useEffect(()=>{
    // console.log('reacting to message')
  },[messages])
  useEffect(()=>{
    messageViewRef.current?.scrollIntoView({ behavior: "smooth" })
  },[messages[selectedFriend.username]])

  return (
    <div
      className={`chatContainer space-y-2 ${
        isSelectedFriend ? "block " : "hidden "
      } sm:block sm:col-span-7 md:col-span-8 lg:col-span-9 mr-2 p-2 bg-base-100 shadow-inner ${
        isHovering ? "shadow-secondary" : "shadow-accent "
      } rounded-xl`}
    >
      {/* user */}
      <div className={`relative flex gap-2 items-center border-2  shadow-lg   rounded-xl bg-base-200 p-2 hover:shadow-secondary hover:border-secondary transition-all ${
        onlineUsers.has(selectedFriend.username)  ? "shadow-green-500 border-green-500" : "shadow-primary border-secondary"
      }`}>
        <div
          className="size-10 sm:hidden bg-accent/10 rounded-full flex items-center justify-center group hover:bg-secondary/20 transition-colors"
          onClick={handleBackClick}
        >
          <ArrowLeft className="size-7 text-accent group-hover:text-secondary animate-bounce" />
        </div>
        
        <img
          className="h-10 border-2 border-accent  p-0.5 rounded-full"
          src={selectedFriend.avatar}
          alt=""
        />
        <div>
          <h1 className=" text-lg">{selectedFriend.username}</h1>
          {/* <p className="line-clamp-1 text-xs font-semibold text-secondary drop-shadow-sm pb-1">
                Online
              </p> */}
        </div>
        <div
          className="absolute rotate-45 right-2 size-10 hidden sm:flex bg-primary/10 rounded-full shadow-md hover:shadow-red-500 items-center justify-center"
          onClick={handleBackClick}
        >
          <Plus className="size-7 text-red-500 animate-bounce" />
        </div>
      </div>{" "}
      {/* message container */}
      <div
        className={` space-y-2 justify-end gap-4 bg-base-200 rounded-lg p-2  shadow-inner ${
          isHovering ? "shadow-secondary" : "shadow-accent"
        }`}
      >
        <div className=" px-2 h-[calc(100vh-14rem)] overflow-y-scroll scrollbar-hide">
        
        {messages[selectedFriend.username] && messages[selectedFriend.username].length > 0 ? 
        messages[selectedFriend.username].map((message)=> {
          return message.senderId === selectedFriend.id ? (
            <FriendMessage key={message._id} timestamp={message.createdAt}  text={message.text} image={message.image} />
          ) : (
            <UserMessage key={message._id} id={message._id} timestamp={message.createdAt} text={message.text} image={message.image} />
          );
        }) 
        : <></>
      }
      <div ref={messageViewRef}></div>
      </div>
      </div>
      {/* input container */}
      <MessageInput />
    </div>
  );
};

export default Chat;
