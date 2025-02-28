import React from "react";
import { useUserStore } from "../store/userStore";
import FriendCard from "./FriendCard";
import { useThemeStore } from "../store/themeStore";
import { useMessageStore } from "../store/messageStore";
import SearchUserInput from "./SearchUserInput";
import SearchCard from "./SearchCard";

const Sidebar = () => {
  const { userFriends, searchFriends, searchResults } = useUserStore();
  const { isSelectedFriend } = useMessageStore();
  const { isHovering } = useThemeStore();

  // console.log(userFriends);

  return (
    <div
      className={`sm:grid sm:col-span-5 md:col-span-4 lg:col-span-3 ml-2 p-2 space-y-4 bg-base-100 rounded-xl shadow-inner
        ${isSelectedFriend ? "hidden " : "block "}
        ${isHovering ? "shadow-secondary" : "shadow-accent "} `}
    >
      {/* search bar */}
      <SearchUserInput />
      <div
        className={`font-semibold   ${
          isHovering ? "text-secondary" : "text-accent "
        } text-xl mt-2  pl-2 hover:text-secondary  drop-shadow-lg `}
      >
        Robo Friends
      </div>
      {/* user friends container */}
      <div className="h-[calc(100vh-13.5rem)] ">
        {/* searchResults */}
        <div
          className={`h-[calc(100vh-13.5rem)] space-y-2 py-2 scrollbar-hide overflow-y-auto ${
            !searchResults ? "hidden" : ""
          }`}
        >
           {searchFriends && searchFriends.length > 0 
           ? searchFriends.map((friend)=> (
           <SearchCard
           key={friend._id}
           id={friend._id}
           avatar={friend.avatar}
           username={friend.userName}
           />)) 
           : <div className="flex  w-full text-center justify-center">
           No Users Found
         </div>} 


        </div>

        {/* friends */}
        <div
          className={`h-[calc(100vh-13.5rem)] space-y-2 py-2 scrollbar-hide overflow-y-auto ${
            searchResults ? "hidden" : ""
          }`}
        >
          {userFriends && userFriends.length > 0 ? (
            userFriends.map((friend) => (
              <FriendCard
                key={friend._id}
                id={friend.friendId._id}
                avatar={friend.friendId.avatar}
                username={friend.friendId.userName}
                lastMessage={friend.lastMessage.text}
              />
            ))
          ) : (
            <div className="flex  w-full text-center justify-center">
              No Friends
            </div>
          )}
        </div>
        {/*   */}
      </div>
    </div>
  );
};

export default Sidebar;
