import React from "react";

const Test = () => {
  const themeColor = "primary";
  return (
    <div className="h-screen flex justify-center ">
       <div className="relative p-6 rounded-xl text-white text-center font-bold bg-primary shadow-lg animate-shadow-pulse">
      <h2 className="text-2xl">DaisyUI Neon Glow</h2>
      <p className="mt-2">Shadow updates dynamically with theme changes.</p>
    </div>
    </div>
  );
};

export default Test;
