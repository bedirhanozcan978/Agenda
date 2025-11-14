import { useState, useRef } from "react";
import useTaskContext from '../hooks/useTaskContext'; 
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import TaskCard from './TaskCard';
import { getFormattedDate } from '../utils/dateUtils';
import useMouseDragScroll from '../hooks/useMouseDragScroll';

export default function DayView() { 
    
    const { 
        multiDayView = [],
        selectedDay,
        addTask, 
        updateTask, 
        deleteTask, 
        tags, 
        selectedTags, 
        isAddTaskModalOpen, 
        setAddTaskModalOpen 
    } = useTaskContext();

    const { 
        scrollRef,
        handleMouseDown,
        handleMouseLeave,
        handleMouseUp,
        handleMouseMove
    } = useMouseDragScroll();

    if (multiDayView.length === 0) return null;

    const DayColumn = ({ dayData }) => {
        if (!dayData) return null;

        return (
            <div className="flex-1 min-w-0">
                <div className="px-4 flex flex-row items-baseline justify-between">
                    <h2 className="text-2xl mb-2">{dayData.weekday}</h2> 
                    <h3 className="text-xl text-gray-600"> {dayData.month} {dayData.day} </h3>
                </div>
                
                <div className="flex flex-col gap-2">
                    {dayData.tasks.map(task => 
                        <TaskCard task={task} onEdit={() => handleEditClick(task)}/>
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
        );
    };

    // Add & Edit Modals
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Task Card Edit Button Handler
    const handleEditClick = (task) => {
        setEditingTask(task);
        setEditModalOpen(true);
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
            
            {/* Çoklu sütun görünümü için ana kapsayıcı */}
            <div className="flex flex-col md:flex-row flex-1 gap-4">
                {multiDayView.map((dayData, index) => (
                    <div key={dayData.id} className={`flex-1 ${index > 0 ? 'hidden md:block' : 'block'}`}>
                        <DayColumn dayData={dayData} />
                    </div>
                ))}
            </div>
        </div>

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