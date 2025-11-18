import {useState, useEffect} from "react";
import useTaskContext from '../hooks/useTaskContext';
import { formatDateId } from "../utils/dateUtils";

export default function TaskCard({ task, onEdit }) { 
    
    const { updateTask, tags, selectedDay } = useTaskContext();

    const [currentTime, setCurrentTime] = useState(new Date());
    
    useEffect(() => {
      const interval = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(interval);
    }, []);

    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const timeString = currentTime.toLocaleTimeString(undefined, timeOptions);

    const timeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours * 60) + minutes;
    };

    const currentMinutes = timeToMinutes(timeString);

    const startMinutes = timeToMinutes(task.start);
    const endMinutes = timeToMinutes(task.end);

    const isTaskActive = task.dayId == formatDateId(new Date()) && currentMinutes >= startMinutes && currentMinutes < endMinutes;


    const timeBgClass = isTaskActive ? 'bg-green text-white' : 'bg-gray-300 text-gray-950';
  
    const handleToggleDone = () => {
        updateTask({ ...task, done: !task.done });
    };

    return (
        <div className="bg-creme rounded-xl shadow p-3 flex flex-col justify-between items-start">
      
            <div className="w-full flex flex-row justify-between">
                <p className="text-xl">{task.title}</p>
                <button onClick={onEdit}><i className="fa fa-pencil w-4 h-4 hover:cursor-pointer"/></button>
              </div>

            <div className="w-full flex flex-row justify-between items-baseline pt-2 text-lg">
                <div className="flex items-baseline cursor-pointer" onClick={handleToggleDone}>
                    <label htmlFor={`task-${task.id}`} style={{color: task.done ?"#9ED36F" :"black" }} className="flex cursor-pointer space-x-2">
                        Done
                        <div className="relative ml-1 w-4 h-4">
                            <input type="checkbox" checked={task.done} readOnly className="appearance-none w-full h-full border-2 rounded-full border-gray-600 checked:border-green" />
                            {task.done && (<i className={`fa fa-check text-sm text-green absolute inset-0 m-auto`}></i>)}
                        </div>  

                    </label>
                </div>
                <p className={`text-gray-950 px-2 rounded-full mb-1 ${timeBgClass}`}>{task.start} / {task.end}</p>
              </div>

            <div className="w-full flex flex-row flex-wrap border-t border-gray-600">
                <p className="text-sm pr-1">Tags:</p>
                {task.tags.map(tagId => {
                    const tagObj = tags.find(t => t.id === tagId);
                    if (!tagObj) return null;
                    return (
                        <span 
                          key={tagId} 
                          style={{ color: tagObj.color }} 
                          className="px-0.5"
                        >
                          #{tagObj.name}
                        </span>
              );
            })}
            </div>

        </div>
    )
};