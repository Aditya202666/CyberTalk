import React from 'react'
import { useThemeStore } from '../store/themeStore';
import { LucideMessageSquareQuote } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    const { isHovering } = useThemeStore();
  return (
    <div
      className={` h-screen min-w-full hidden items-center
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
        Page Not Found
        </h1>
      </div>
      <Link to={'/'} className="font-semibold text-2xl hover:text-secondary link  text-accent pt-0.5">Go to HomePage</Link>
      
      </div>
    </div>
  )
}

export default PageNotFound
