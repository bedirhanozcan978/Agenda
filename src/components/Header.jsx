import { useState, useEffect } from "react";

export default function Header(){

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = currentTime.toLocaleDateString(undefined, options);
  const timeString = currentTime.toLocaleTimeString();

  return (
    <header className="flex items-center justify-between p-4 border-b border-ocean bg-sand font-lalezar text-2xl">
      <div className="text-ocean">Today</div>
      <div className="text-ocean"> {dateString} - {timeString} </div>
      <nav className="space-x-4">
        <button className="text-ocean font-medium border-b-3 border-ocean">Tasks</button>
        <button className="text-ocean">Calendar</button>
      </nav>
    </header>
  );
}
