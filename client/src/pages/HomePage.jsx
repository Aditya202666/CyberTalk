import React, { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
import { useMessageStore } from "../store/messageStore";
import { useWebSocketStore } from "../store/webSocketStore";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import NoSelectedFriend from '../components/NoSelectedFriend'

const HomePage = () => {
  const { checkAuth, authUser } = useAuthStore();
  const { getAllFriends } = useUserStore();
  const { selectedFriend } = useMessageStore();

  useEffect(() => {
    getAllFriends();
  }, []);



  return (
    <div className="h-screen flex flex-col items-center ">
      <Navbar />
      <div className="home flex gap-2 flex-col-reverse sm:grid sm:grid-cols-12 mx-auto mt-4 max-w-screen-2xl w-full ">
        {/* sidebar */}
        <Sidebar />

        {/* chat container */}
        {selectedFriend ? <Chat /> : <NoSelectedFriend/>} 
      </div>
    </div>
  );
};

export default HomePage;
