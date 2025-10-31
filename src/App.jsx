import { useState, useEffect } from 'react'
import useLocalStorage from "./hooks/useLocalStorage";
import './assets/styles/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import Sidebar from './components/Sidebar'
import DayView from './components/DayView'
import Header from './components/Header'

function App() {
  
  // Tags Local Storage Settings
  const defaultTags = [{ id: 0, name: "All", color: "#9ED36F" }];
  const [tags, setTags] = useLocalStorage("agenda:tags", defaultTags);

  //DayView Local Storage Settings
  const [selectedDay, setSelectedDay] = useState(null);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("agenda:tasks")) || []);
  
  useEffect(() => {
    localStorage.setItem("agenda:tasks", JSON.stringify(tasks));
  }, [tasks]);

  //CRUD Funtions
  const addTask = (task) => setTasks(prev => [...prev, task]);
  const updateTask = (updatedTask) => setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  const deleteTask = (taskId) => setTasks(prev => prev.filter(t => t.id !== taskId));

  // Filter Tasks
  const tasksForSelectedDay = tasks.filter(t => t.dayId === selectedDay?.id);

  //Selected tags
  const [selectedTags, setSelectedTags] = useState([0]);

  // AddTask Modal
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);

  //Sidebar isopen state
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-sand text-gray-900">
      <Sidebar
        tags={tags} setTags={setTags}
        selectedDay={selectedDay} setSelectedDay={setSelectedDay}
        selectedTags={selectedTags} setSelectedTags={setSelectedTags}
        setAddTaskModalOpen={setAddTaskModalOpen}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header setSelectedDay={setSelectedDay} setIsOpen={setIsOpen} isOpen={isOpen}/>
        {selectedDay && (
          <DayView
            day={selectedDay}
            tasks={tasksForSelectedDay}
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
            tags={tags}
            selectedTags={selectedTags}
            selectedDay={selectedDay}
            isAddTaskModalOpen={isAddTaskModalOpen}
            setAddTaskModalOpen={setAddTaskModalOpen}
          />
        )}
      </div>
    </div>
  );
}

export default App;
