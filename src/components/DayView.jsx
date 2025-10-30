import { useState } from "react";

import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import TaskCard from './TaskCard'

export default function DayView({ day, tasks, addTask, updateTask, deleteTask, tags }) {

  //Day Parser
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

  const dayDate = new Date(day.year, day.month - 1, day.day);
  const { weekday, day: dayNum, month: monthName, year } = getFormattedDate(dayDate);

  //Add & Edit Modals
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  //Task Card Edit Button Handler
  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditModalOpen(true);
  };

  return (
   <>
   <div className="flex p-6 gap-4 font-lalezar">
      
      <div className="flex-1">
        <div className="px-4 flex flex-row items-baseline justify-between ">
          <h2 className="text-2xl mb-2">{weekday}</h2> 
          <h3 className="text-xl text-gray-600"> {monthName} {dayNum} </h3>
        </div>
        
        <div className="flex flex-col gap-2">
          {tasks.map(task => <TaskCard key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} onEdit={() => handleEditClick(task)} tags={tags}/>)}

          <div className="bg-creme rounded-xl text-xl shadow p-3 flex flex-row justify-between items-baseline" onClick={() => setAddModalOpen(true)}>
            <p>+ Addtask</p>
            <p className="text-gray-600"> --:-- </p>
          </div>
        </div>
      </div>

    </div>
    <AddTaskModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} addTask={addTask} day={day} tags={tags}/>
    <EditTaskModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} updateTask={updateTask} deleteTask={deleteTask} day={day} task={editingTask} tags={tags}/>
    </>
  )
}
