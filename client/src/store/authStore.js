import {create} from 'zustand'
import axiosInstance from '../lib/axios.js'
import { toast } from 'react-toastify'
import { useMessageStore } from './messageStore.js'
import { useWebSocketStore } from './webSocketStore.js'
import { TrafficCone } from 'lucide-react'


export const useAuthStore = create((set, get)=> ({

    authUser: null,
    isAuthenticatingUser: true,
    isFormLoading: false,
    isChangingPassword: false,

    registerUser : async(data) => {

        set({isFormLoading: true})
        const { connectSocket } = useWebSocketStore.getState()
        
        try {
            const user = await axiosInstance.post("auth/register", data)
            if(user.data.success) {
                toast.success(user.data.message)
                set({authUser:user.data.data})
                connectSocket()
                return true
            }
            else{
                toast.error(user.data.message)
                return false
            }

            
        } catch (error) {

            set({ authUser:null})
            console.log(`error in checkAuth: ${error.message}`)

        } finally {
            set({isFormLoading: false})
        }
    },


    login : async(data) => {

        set({isFormLoading: true})
        const { connectSocket } = useWebSocketStore.getState()
        try {

            const user = await axiosInstance.post("auth/login", data)
            if(user.data.success) {
                set({authUser:user.data.data})
                toast.success(user.data.message)  
                connectSocket()
                return true
            }
            else{
                toast.error(user.data.message)
                return false
            }
            
        } catch (error) {

            set({ authUser:null})
            console.log(`error in checkAuth: ${error.message}`)

        } finally {
            set({isFormLoading: false})
        }
    },


    checkAuth : async() => {

        const { connectSocket } = useWebSocketStore.getState()
        try {
            const user = await axiosInstance.get("auth/authUser")
            if(!user.data.success) {
                set({authUser:null})
                toast.error(user.data.message)
            }else{
                set({authUser:user.data.data})
                connectSocket()
            }
            
        } catch (error) {

            set({ authUser:null})
            console.log(`error in checkAuth: ${error.message}`)

        } finally {
            set({isAuthenticatingUser: false})
        }
    },

    

    logout: async() => {
            const { disconnectSocket } = useWebSocketStore.getState()
            const {removeSelectedFriend,removeMessages} = useMessageStore.getState()
        try {

            await axiosInstance.post('auth/logout')
            set({authUser: null})
            toast.success('Logged out successfully')
            removeMessages()
            removeSelectedFriend()
            disconnectSocket()
            
            
        } catch (error) {
            console.log(`error in logout: ${error.message}`)
        }

    },

    sendForgotPasswordOtp : async(data) =>{

        try {

            const res = await axiosInstance.post("auth/sendForgotPasswordOtp", data)

            if(res.data.success) {
                toast.success(res.data.message)
                return true
            }
            else {
                toast.error(res.data.message)
                return false
            }
            
        } catch (error) {
            console.log(`error in sendForgotPasswordOtp: ${error.message}`)
        }
    },


    verifyForgotPasswordOtp : async(data) =>{

        try {

            const res = await axiosInstance.post("auth/verifyForgotPasswordOtp", data)

            if(res.data.success) {
                toast.success('Password reset successfully')
                toast.success('New Password sent to user email address')
                return true
            }
            else {
                toast.error(res.data.message)
                return false
            }
            
        } catch (error) {
            console.log(`error in sendForgotPasswordOtp: ${error.message}`)
        }
    },

    sendEmailVerificationOtp: async() =>{
        
        try {
            const res = await axiosInstance.post("auth/sendEmailVerificationOtp")
            if(res.data.success) {
                toast.success(res.data.message)
                return true
            }else{
                toast.error(res.data.message)
                return false
            }
            
        } catch (error) {
            console.log(`error in sendEmailVerificationOtp: ${error.message}`)
        }
    },
    verifyEmailOtp: async(data) =>{
        
        try {
            const res = await axiosInstance.post("auth/verifyEmailOtp", data)
            if(res.data.success) {
                toast.success(res.data.message)
                return true
            }else{
                toast.error(res.data.message)
                return false
            }
            
        } catch (error) {
            console.log(`error in sendEmailVerificationOtp: ${error.message}`)
        }
    },
    changePassword: async(data) =>{
        
        try {
            set({isChangingPassword: true})
            const res = await axiosInstance.post("auth/changePassword", data)
            if(res.data.success) {
                toast.success(res.data.message)
            }else{
                toast.error(res.data.message)
            }
            
        } catch (error) {
            console.log(`error in sendEmailVerificationOtp: ${error.message}`)
        }finally{
            set({isChangingPassword: false})
        }
    },

}))

