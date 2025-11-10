import {useState, useEffect} from "react";
import useTaskContext from '../hooks/useTaskContext';

// Helper Function
const formatDateId = (d) => 
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;


function Calendar() {
    
    const { selectedDay, setSelectedDay } = useTaskContext();

    // Month and day states
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [days, setDays] = useState([]);

    // Generator of month days - Note: Will carry this in the utils file
    const generateMonthDays = (year, month) => {
        const days = [];
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const daysInMonth = new Date(year, month, 0).getDate();
        const startDay = firstDayOfMonth.getDay();

        // Add previous month's days
        const prevMonthDays = startDay === 0 ? 6 : startDay - 1;
        const prevMonthDate = new Date(year, month - 1, 0).getDate();

        for (let i = prevMonthDays; i > 0; i--) {
            const d = new Date(year, month - 2, prevMonthDate - i + 1);
            days.push({
                id: formatDateId(d),
                year: d.getFullYear(),
                month: d.getMonth() + 1,
                day: d.getDate(),
                weekday: d.getDay(),
                isCurrentMonth: false,
                tasks: [],
            });
        }

        // Current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const d = new Date(year, month - 1, day);
            days.push({
                id: formatDateId(d),
                year: year,
                month: month,
                day: day,
                weekday: d.getDay(),
                isCurrentMonth: true,
                tasks: [],
            });
        }

        // Next month's days
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            const d = new Date(year, month, i);
            days.push({
                id: formatDateId(d),
                year: d.getFullYear(),
                month: d.getMonth() + 1,
                day: d.getDate(),
                weekday: d.getDay(),
                isCurrentMonth: false,
                tasks: [],
            });
        }

        return days;
    };

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
        // max-w-md ve mx-auto, Sidebar içinde gereksiz olduğundan kaldırıldı.
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

            <div className="grid grid-cols-7 gap-1 text-center font-medium">
                {weekdays.map((day, index) => (
                    <div key={index}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mt-1">
                {days.map((dayObj) => (
                    <div
                    key={dayObj.id}
                    onClick={() => setSelectedDay(dayObj)}
                    className={`p-1 rounded-full cursor-pointer transition-colors duration-150
                      ${
                        dayObj.id === selectedDay?.id
                        ? "bg-ocean text-white"
                        : dayObj.isCurrentMonth
                        ? "text-black hover:bg-hoverocean hover:text-white"
                        : "text-gray-400"
                      }`}
>
                        {dayObj.day}
                    </div>
                ))}
            </div>

        </div> 
    )
}

export default Calendar;