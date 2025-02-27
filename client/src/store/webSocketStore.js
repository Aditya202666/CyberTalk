import { create } from "zustand";
import { io } from "socket.io-client";
import { useAuthStore } from "./authStore";
import { useMessageStore } from "./messageStore";

const server = import.meta.env.MODE === "development" ? import.meta.env.VITE_SERVER : "/";

export const useWebSocketStore = create((set, get) => ({
  socket: null,
  onlineUsers: new Map(),


  connectSocket: () => {
    const { authUser } = useAuthStore.getState();
    const { subscribeNewMessages } = useMessageStore.getState();
    const socket = io(server, {
      query: { username: authUser.userName },
    });

    socket.connect();
    // console.log(socket)
    set({ socket: socket });

    socket.on("getOnlineUsers", (users) => {
        const onlineUsers =  new Map(users)
        set({ onlineUsers: onlineUsers });
        // console.log(onlineUsers);
    });

    subscribeNewMessages();
    // console.log(`ws connect`)
  },

  disconnectSocket: () => {
    const { socket } = get();
    const { unSubscribeNewMessages } = useMessageStore.getState();
    if (socket?.connected) {
      // console.log(`ws disconnect`)
      socket.off("getOnlineUsers");
      unSubscribeNewMessages()    
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
