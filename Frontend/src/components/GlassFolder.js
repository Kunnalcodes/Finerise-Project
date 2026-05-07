import React from "react";
import { cn } from "../lib/utils";

const GlassFolder = ({ icon, className, title, description }) => {
  return (
    <section
      className={cn(
        "relative group flex flex-col items-center justify-center p-4",
        className
      )}
    >
      <div className="relative w-64 h-48 cursor-pointer origin-bottom [perspective:1500px] z-10 flex flex-col items-center">
        {/* Top tab */}
        <div
          className="bg-[rgba(26,64,77,0.3)] backdrop-blur-md w-full h-full origin-top rounded-2xl rounded-tl-none 
          group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all ease duration-300 relative 
          after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-[rgba(26,64,77,0.3)] after:backdrop-blur-md after:rounded-t-2xl 
          before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-[rgba(26,64,77,0.3)] before:backdrop-blur-md before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]"
        ></div>

        {/* Folder layers */}
        <div className="absolute inset-1 bg-[rgba(26,64,77,0.1)] backdrop-blur-md rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]"></div>
        <div className="absolute inset-1 bg-[rgba(26,64,77,0.15)] backdrop-blur-md rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]"></div>
        <div className="absolute inset-1 bg-[rgba(26,64,77,0.2)] backdrop-blur-md rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]"></div>

        {/* Front folder layer with icon */}
        <div
          className="absolute bottom-0 bg-[rgba(26,64,77,0.4)] backdrop-blur-md w-full h-[166px] rounded-2xl rounded-tr-none 
          after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[156px] after:h-[16px] after:bg-[rgba(26,64,77,0.4)] after:backdrop-blur-md after:rounded-t-2xl 
          before:absolute before:content-[''] before:-top-[10px] before:right-[152px] before:size-3 before:bg-[rgba(26,64,77,0.4)] before:backdrop-blur-md before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] 
          transition-all ease duration-300 origin-bottom flex flex-col items-center justify-center p-4
          group-hover:shadow-[inset_0_20px_40px_rgba(255,255,255,0.1),inset_0_-20px_40px_rgba(0,0,0,0.1)] 
          group-hover:[transform:rotateX(-46deg)_translateY(1px)] text-white"
        >
          <div className="text-4xl mb-2">{icon}</div>
          <h3 className="font-bold text-lg text-center tracking-tight">{title}</h3>
          <p className="text-xs text-center opacity-80 mt-1">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default GlassFolder;
