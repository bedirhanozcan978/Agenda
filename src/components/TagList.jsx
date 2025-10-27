import { useRef } from "react";
import React, { useState } from "react";

export default function TagList({tags}) {

  const scrollRef = useRef(null);

  const handleMouseDown = (e) => {
    const el = scrollRef.current;
    el.isDown = true;
    el.startY = e.pageY - el.offsetTop;
    el.scrollTopStart = el.scrollTop;
  };

  const handleMouseLeave = () => (scrollRef.current.isDown = false);
  const handleMouseUp = () => (scrollRef.current.isDown = false);

  const handleMouseMove = (e) => {
    const el = scrollRef.current;
    if (!el.isDown) return;
    e.preventDefault();
    const y = e.pageY - el.offsetTop;
    const walk = (y - el.startY)
    el.scrollTop = el.scrollTopStart - walk;
  };     

  return (
  <>  
  
    <button className="px-4 text-xl text-ocean">Add Tag +</button>
    
    <div className="relative w-full max-w-md mx-auto py-5 select-none">

      <div className="absolute top-0 left-0 right-0 h-2 pointer-events-none bg-gradient-to-b from-black/20 to-transparent"></div>

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="overflow-y-auto max-h-50 flex flex-col -my-5 space-y-2 px-4 scrollbar-hide cursor-grab active:cursor-grabbing"
      >
        { tags && tags.map((tag) => (
          <div key = {tag.id} className="flex flex-row text-xl">
            <p style={{ color: tag.color }} className="mr-3">#</p>
            <p>{tag.name}</p>
          </div>
          ))
        }

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>

  </>
  );
}
