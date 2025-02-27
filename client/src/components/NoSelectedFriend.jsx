import React from "react";
import { useThemeStore } from "../store/themeStore";
import { useMessageStore } from "../store/messageStore";
import { LucideMessageSquareQuote } from "lucide-react";

const NoSelectedFriend = () => {
  const { isHovering } = useThemeStore();

  return (
    <div
      className={` min-w-full h-full hidden items-center
       sm:flex sm:col-span-7 md:col-span-8 lg:col-span-9 mr-2 p-2 bg-base-100 shadow-inner ${
         isHovering ? "shadow-secondary" : "shadow-accent "
       } rounded-xl`}
    >
      <div className="h-3/4 w-full mx-6 flex flex-col  gap-2 justify-center items-center border-2 border-base-300 shadow-lg   rounded-xl bg-base-200 p-2 hover:shadow-secondary hover:border-secondary transition-all ">
      <div v className=" flex align-middle gap-2 cursor-pointer group">
        <div className="size-14 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20  transition-colors">
          <LucideMessageSquareQuote className="size-8 text-accent animate-bounce drop-shadow-lg group-hover:text-secondary" />
        </div>{" "}
        <h1 className=" font-semibold text-4xl group-hover:text-secondary  text-accent pt-0.5">
        CyberTalk
        </h1>
      </div>
      <p className="font-semibold text-2xl hover:text-secondary  text-accent pt-0.5">Select a friend & start chatting.</p>
      
      </div>
    </div>
  );
};

export default NoSelectedFriend;
