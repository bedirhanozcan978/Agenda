import { useState } from "react";
import Calendar from "./Calendar";
import TagList from "./TagList";
import ArrowDown from '../assets/img/arrow-to-line.svg?react';

export default function Sidebar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (

   <aside className="w-64 bg-creme flex flex-col items-start shadow-2xl/30 font-lalezar">
      
    {/** Logo and Sidebar toogle **/}
    <div className="flex flex-row w-full p-4 justify-between items-baseline">
      <h1 className="text-4xl text-ocean mb-6">Agenda</h1>
      <button onClick={toggleSidebar}>
        <ArrowDown className={`text-ocean w-7 h-7 transform origin-center transition-transform duration-300 ${isOpen ? '-rotate-180' : 'rotate-0'}`} />
      </button>
    </div>
      
    <button className="bg-ocean text-white text-2xl rounded-full px-5 py-2 -pt-1 mb-4 self-center">+ Create</button>
      
    <Calendar></Calendar>

    <button className="px-4 text-xl text-ocean">Add Tag +</button>

    <TagList></TagList>

  </aside>

  )
}
