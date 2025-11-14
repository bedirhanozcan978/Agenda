import { useState, useEffect } from "react";
import useTaskContext from '../hooks/useTaskContext'; 
import ArrowDown from '../assets/img/arrow-to-line.svg?react';
import { formatDateId } from '../utils/dateUtils';

export default function Header() { 

  const { 
        setSelectedDay, 
        setIsOpen, 
        isOpen 
    } = useTaskContext();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = currentTime.toLocaleDateString(undefined, options);

  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
  const timeString = currentTime.toLocaleTimeString(undefined, timeOptions);
  
  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDay({
      id: formatDateId(today),
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    });
  };

  const toggleSidebar = () => setIsOpen(!isOpen);


  return (
    <header className="flex flex-row md:flex-row items-center justify-between p-2 md:p-4 border-b border-ocean bg-sand font-lalezar text-xl md:text-2xl gap-1 md:gap-2">
      <div className="flex flex-row justify-baseline">

          <button onClick={toggleSidebar} className="block">
              <ArrowDown className={`text-ocean w-6 md:w-7 h-6 md:h-7 transform transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-180'}`} />
          </button>
      
          <div className="text-ocean hover:text-hoverocean hover:cursor-pointer text-sm md:text-2xl pl-2 md:pl-5" onClick={handleTodayClick}>Today</div>
      </div>
      <div className="text-ocean text-sm md:text-2xl">{dateString} - {timeString}</div>
      <nav className="space-x-2 md:space-x-4">
        <button className="text-ocean font-medium border-b-2 md:border-b-3 border-ocean text-sm md:text-2xl">Tasks</button>
        <button className="text-ocean text-sm md:text-2xl">Calendar</button>
      </nav>
    </header>
  );
};