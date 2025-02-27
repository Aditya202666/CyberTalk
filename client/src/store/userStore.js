import { toast } from 'react-toastify'
import {create} from 'zustand'
import { useAuthStore } from './authStore'
import axiosInstance from '../lib/axios'

export const useUserStore = create((set, get)=>({

    isUpdatingAvatar: false,
    isUpdatingUsername: false,
    userFriends: [],
    searchFriends: [],
    searchResults: false,
    
    

    // get all friends
    getAllFriends: async()=>{
        try {

            const res = await axiosInstance.get('/user/getAllFriends')
            if(res.data.success){
                set({userFriends: res.data.data})

            }
            
        } catch (error) {
            console.log(`error in getAllFriends: ${error.message}`)
        }
    },


    searchUsers :async(data)=>{
        try {
            console.log(data)
            const res = await axiosInstance.get(`user/searchUsers/${data.searchTerm}`)
            console.log(res)
            if(res.data.success){
                set({searchFriends: res.data.data})
                set({searchResults: true})
                console.log(get().searchFriends)
            }
            
        } catch (error) {
            console.log(`error in searchUsers: ${error.message}`)
        }
    },

    clearSearchResults :()=>{
        set({searchResults: false})
    },

    // checkIsUserNameTaken
    checkIsUserNameTaken: async(data)=> {

        try {
            if(!data.userName) return
            const checkUserName = await axiosInstance.post('user/checkIsUsernameTaken', data)
            if(checkUserName.data.success) toast.success(checkUserName.data.message)
            if(!checkUserName.data.success) toast.info(checkUserName.data.message)
        } catch (error) {
            console.log(`error in checkUserName: ${error.message}`)            
        }
    },
 
    //changeUserName
    changeUserName: async(data)=> {
        try {
            set({isUpdatingUsername: true})
            const authUser = useAuthStore.getState().authUser
            const res = await axiosInstance.put('/user/changeUsername', data)
            if(res.data.success) {
                toast.success(res.data.message)
                set({authUser: {...authUser, userName: data.newUsername}})
                return true
            }
            toast.error(res.data.message)
            
        } catch (error) {
            console.log(`error in changeUserName: ${error.message}`)
        } finally { set({isUpdatingUsername: false})}
    },

    // changeAvatar
    changeAvatar: async(data)=> {
        try {
            set({isUpdatingAvatar: true})
            const authUser = useAuthStore.getState().authUser
            const res = await axiosInstance.put('user/changeAvatar', data)
            if(res.data.success) {
                toast.success(res.data.message)
                console.log(res.data)
                set({authUser: {...authUser, avatar: res.data.data}})
                return true
            }
            
        } catch (error) {

            console.log(`error in changeAvatar: ${error.message}`)
        } finally { set({isUpdatingAvatar: false})}
    },
 
}))