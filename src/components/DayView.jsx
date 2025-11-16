import { useState, useRef } from "react";
import useTaskContext from '../hooks/useTaskContext'; 
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import useMouseDragScroll from '../hooks/useMouseDragScroll';
import DayColumn from "./DayColumn";

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
        setAddTaskModalOpen,
        isEditModalOpen,
        setEditModalOpen,
        editingTask,
        setEditingTask,
        clickedDay
    } = useTaskContext();

    const { 
        scrollRef,
        handleMouseDown,
        handleMouseLeave,
        handleMouseUp,
        handleMouseMove
    } = useMouseDragScroll();

    if (multiDayView.length === 0) return null;

    return (
    <>
        <div className="flex p-6 gap-4 font-lalezar overflow-y-auto scrollbar-hide"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
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
            day={clickedDay}
            tags={tags}
        />
        <EditTaskModal 
            isOpen={isEditModalOpen} 
            onClose={() => setEditModalOpen(false)} 
            updateTask={updateTask}
            deleteTask={deleteTask}
            day={clickedDay} 
            task={editingTask} 
            tags={tags}
        />

    </>

    )
}