import {useState, useEffect, useMemo} from "react";
import useTaskContext from '../hooks/useTaskContext';
import { formatDateId, addDays } from '../utils/dateUtils';
import { generateMonthDays } from '../utils/calendarUtils'

function Calendar() {
    
    const { selectedDay, setSelectedDay } = useTaskContext();

    // Days highlight
    const highlightedDays = useMemo(() => {
        if (!selectedDay) return [];

        const dayList = [];
        
        const startDate = new Date(selectedDay.year, selectedDay.month - 1, selectedDay.day);

        for (let i = 0; i < 3; i++) {
            const date = addDays(startDate, i);
            dayList.push(formatDateId(date));
        }

        return dayList;
    }, [selectedDay]);

    const processedDayIds = new Set();

    // Month and day states
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [days, setDays] = useState([]);

    // Calculate days again if month changes
    useEffect(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        const monthDays = generateMonthDays(year, month);
        setDays(monthDays);
        
        // Set selected day to today
        if (!selectedDay) {
            const today = new Date();
            const todayId = formatDateId(today);
            const todayObj = monthDays.find(d => d.id === todayId);
            if (todayObj) setSelectedDay(todayObj);
        }
    }, [currentMonth, selectedDay, setSelectedDay]);

    // Previous and next month buttons
    const handlePrevMonth = () => {
        setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    // Stringify the month and day
    const monthName = currentMonth.toLocaleString("default", { month: "long" });
    const year = currentMonth.getFullYear();

    // Weekdays for mapping
    const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

    return(
        <div className="w-full p-4">  
            <div className="w-full px-2 flex flex-row justify-between">
                <div>
                    <i className="fa fa-arrow-left text-ocean cursor-pointer" onClick={handlePrevMonth}></i>
                </div>
                <div>
                    <p className="text-xl"> {monthName.charAt(0).toUpperCase() + monthName.slice(1)} {year} </p>
                </div>
                <div>
                    <i className="fa fa-arrow-right text-ocean cursor-pointer" onClick={handleNextMonth}></i>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-lg">
                {weekdays.map((day, index) => (
                    <div key={index}>{day}</div>
                ))}
            </div>
            
            <div className="grid grid-cols-7 gap-0 text-center mt-1 font-lg">
                {days.map((dayObj, index) => {
                    const isSelected = dayObj.id === selectedDay?.id;
                    const dayId = dayObj.id;
                    const isDayOne = highlightedDays[0] === dayId;
                    const isDayTwo = highlightedDays[1] === dayId;
                    const isDayThree = highlightedDays[2] === dayId;

                let dayContainerClass = '';
                let dayNumberClass = '';

                if (isDayOne || isDayTwo || isDayThree) {
                    
                    dayContainerClass += 'bg-none md:bg-cyan ';
                    
                    if (isDayOne) {
                        dayContainerClass += ' rounded-l-full ';
                    }
                    if (isDayThree) {
                        dayContainerClass += ' rounded-r-full ';
                    }
                    
                    if (isSelected) {
                        dayNumberClass = ' bg-ocean text-white rounded-full'; 
                    } else {
                        dayNumberClass = ' text-black hover:bg-hoverocean hover:text-white rounded-full';
                    }

                } else if (isSelected) {
                    dayContainerClass = "bg-ocean text-white rounded-full";
                } else if (dayObj.isCurrentMonth) {
                    dayContainerClass = "text-black hover:bg-hoverocean hover:text-white rounded-full";
                } else {
                    dayContainerClass = "text-gray-400";
                }
                
                return (
                <div
                key={dayObj.id}
                onClick={() => setSelectedDay(dayObj)}
                className={`cursor-pointer transition-colors duration-150 relative flex items-center justify-center ${dayContainerClass}`}
                >
                    <div className={`p-0.5 w-8 h-8 flex items-center justify-center ${dayNumberClass}`}>
                        {dayObj.day}
                    </div>
                </div>
                
                )})}
            </div>

        </div> 
    )
}

export default Calendar;