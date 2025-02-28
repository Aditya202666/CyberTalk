import React from 'react'
import { useMessageStore } from '../store/messageStore';
import { useWebSocketStore } from '../store/webSocketStore';

const SearchCard = ({ avatar, username, id }) => {
 const { setSelectedFriend, selectedFriend, getMessages } = useMessageStore();
 const { onlineUsers } = useWebSocketStore();
 
   const handleClick = () =>{
     setSelectedFriend({ avatar, username, id })
     getMessages({username, id})
   }
  //  console.log('here')
   return (
     <div
       className={`flex gap-2 items-center border-2  shadow-md rounded-xl bg-base-300 p-2  mx-1 hover:scale-95  hover:border-secondary transition-all duration-500 
        ${
        selectedFriend?.username === username ? "border-secondary bg-base-200 scale-95" : ""
      } ${
        onlineUsers.has(username)  ? "shadow-green-500 border-green-500" : "border-primary shadow-primary "
      }`}
       onClick={handleClick}
     >
       <img
         className="size-10 border-2 border-accent  p-0.5 rounded-full"
         src={avatar}
         alt="avatar"
       />
       <div>
         <h1 className=" text-lg">{username}</h1>
       </div>
     </div>
   );
 };

export default SearchCard
