import { create } from "zustand";

export const useThemeStore = create((set,get)=>({

    currentTheme: localStorage.getItem('CyberTalk-theme') ||'synthwave',
    isHovering: false,

    toggleHover: (data) => {
        const { isHovering } = get();
        if (isHovering !== data) {
            set({ isHovering: data });
        }
    },


    changeTheme: (theme) => {
        localStorage.setItem('CyberTalk-theme', theme)
        set({ currentTheme: theme })
    }
    
}))