import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { useUserStore } from "./userStore";
import { useWebSocketStore } from "./webSocketStore";

export const useMessageStore = create((set, get) => ({
  messages: {},
  isSendingMessage: false,
  selectedFriend: null,
  isSelectedFriend: false,

  setSelectedFriend: (friend) => {
    set({ selectedFriend: { ...friend } });
    set({ isSelectedFriend: true });
    // console.log("here", friend);
    // console.log(get().selectedFriend);
  },

  removeSelectedFriend: () => {
    set({ selectedFriend: null });
    set({ isSelectedFriend: false });
  },

  removeMessages: () =>{
    set({ messages: {} });
  },

  //get Message
  getMessages: async (data) => {
    // fetch messages from server
    try {
      // console.log(data.id);
      const res = await axiosInstance.get(`/message/getMessages/${data.id}`);
      if (res.data.success) {
        set({
          messages: { ...get().messages, [data.username]: res.data.data },
        });
      }
      // console.log(get().messages);
    } catch (error) {
      console.log(`error in getMessages: ${error.message}`);
    }
  },

  sendMessage: async (data) => {
    try {
      set({isSendingMessage: true})
      const { selectedFriend, messages } = get();
      const res = await axiosInstance.post(
        `/message/sendMessage/${selectedFriend.id}`,
        {...data, username:selectedFriend.username}
      );
      console.log('here 22', selectedFriend.userName) // this is undefined
      if (res.data.success) {
        set({
          messages: {
            ...messages,
            [selectedFriend.username]: [
              ...messages[selectedFriend.username],
              res.data.data,
            ],
          },
        });
        // console.log(
        //   `message sent successfully to ${(selectedFriend.username, messages)} `
        // );
      }
    } catch (error) {
      console.log(`error in sendMessage: ${error.message}`);
    } finally{
      set({isSendingMessage: false})
    }
  },

  subscribeNewMessages: () =>{
    const { socket } = useWebSocketStore.getState()
    const { getAllFriends } = useUserStore.getState()
    // console.log('subscribed to new messages')
    socket.on("newMessage", (username, newMessage)=>{ // username: { text:"", image:"", }
      
      // console.log(username, newMessage)
      set((state)=>{
        const updatedMessages = {
          ...state.messages,
          [username]: [
            ...(state.messages[username] || []),
            newMessage
          ]
        }
        // console.log(updatedMessages)
        return {messages :updatedMessages}
      })

      getAllFriends();
    })
  },

  unSubscribeNewMessages: ()=>{
    const { socket } = useWebSocketStore.getState()
    // console.log('un-subscribed to new messages')
    socket.off("newMessage")

  },


  //delete Message

}));
