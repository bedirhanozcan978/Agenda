import { useState, useRef } from "react";
import useTaskContext from '../hooks/useTaskContext'; 
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import TaskCard from './TaskCard';

export default function DayView() { 
    
    const { 
        selectedDay,
        filteredTasks,
        addTask, 
        updateTask, 
        deleteTask, 
        tags, 
        selectedTags, 
        isAddTaskModalOpen, 
        setAddTaskModalOpen 
    } = useTaskContext();

    // Day Parser - Note: Will move this into the utils file
    const getFormattedDate = (date) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return {
            weekday: days[date.getDay()],
            day: date.getDate(),
            month: months[date.getMonth()],
            year: date.getFullYear(),
        };
    };

    const dayDate = new Date(selectedDay.year, selectedDay.month - 1, selectedDay.day);
    const { weekday, day: dayNum, month: monthName } = getFormattedDate(dayDate);


    // Add & Edit Modals
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Task Card Edit Button Handler
    const handleEditClick = (task) => {
        setEditingTask(task);
        setEditModalOpen(true);
    };
    
    // Scroll Function - Note: This code will be moved into the utils file
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
        <div className="flex p-6 gap-4 font-lalezar overflow-y-auto scrollbar-hide"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
            
            <div className="flex-1">
                <div className="px-4 flex flex-row items-baseline justify-between ">
                    <h2 className="text-2xl mb-2">{weekday}</h2> 
                    <h3 className="text-xl text-gray-600"> {monthName} {dayNum} </h3>
                </div>
                
                <div className="flex flex-col gap-2">
                    {filteredTasks.map(task => 
                        <TaskCard 
                            task={task} 
                            onEdit={() => handleEditClick(task)} 
                        />
                    )}

                    <div 
                        className="bg-creme rounded-xl text-xl shadow p-3 flex flex-row justify-between items-baseline mb-3 hover:cursor-pointer hover:bg-hovercreme" 
                        onClick={() => setAddTaskModalOpen(true)}
                    >
                        <p>+ Addtask</p>
                        <p className="text-gray-950 bg-gray-300 px-2 rounded-full"> --:-- </p>
                    </div>
                </div>
            </div>

        </div>
        
        {/* Modals */}
        <AddTaskModal 
            isOpen={isAddTaskModalOpen} 
            onClose={() => setAddTaskModalOpen(false)} 
            addTask={addTask}
            day={selectedDay} 
            tags={tags}
        />
        <EditTaskModal 
            isOpen={isEditModalOpen} 
            onClose={() => setEditModalOpen(false)} 
            updateTask={updateTask}
            deleteTask={deleteTask}
            day={selectedDay} 
            task={editingTask} 
            tags={tags}
        />
        </>
    )
}