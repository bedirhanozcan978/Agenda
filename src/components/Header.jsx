import { useState, useEffect } from "react";

export default function Header({ setSelectedDay }){

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = currentTime.toLocaleDateString(undefined, options);

  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
  const timeString = currentTime.toLocaleTimeString(undefined, timeOptions);

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDay({
      id: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    });
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-ocean bg-sand font-lalezar text-2xl">
      <div className="text-ocean hover:text-hoverocean hover:cursor-pointer" onClick={handleTodayClick}>Today</div>
      <div className="text-ocean"> {dateString} - {timeString} </div>
      <nav className="space-x-4">
        <button className="text-ocean font-medium border-b-3 border-ocean">Tasks</button>
        <button className="text-ocean">Calendar</button>
      </nav>
    </header>
  );
}
