import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.jsx';
import { getFormattedDate, addDays, formatDateId } from '../utils/dateUtils.js';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    
    // Tags
    const defaultTags = [{ id: 0, name: "All", color: "#9ED36F" }];
    const [tags, setTags] = useLocalStorage("agenda:tags", defaultTags);
    
    const [tasks, setTasks] = useLocalStorage("agenda:tasks", []); 

    // Sidebar State
    const [isOpen, setIsOpen] = useState(true);
    
    // Modals
    const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [clickedDay, setClickedDay] = useState(null);

    
    // Seçili Etiketler
    const [selectedTags, setSelectedTags] = useState([0]);

    // Selected Day
    const [selectedDay, setSelectedDay] = useState(null); 


    // Task CRUD Functions

    const addTask = (task) => setTasks(prev => [...prev, task]);
    
    const updateTask = (updatedTask) => {
        setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    };
    
    const deleteTask = (taskId) => setTasks(prev => prev.filter(t => t.id !== taskId));
    
    // Tag CRUD Functions
    const handleAddTag = (newTag) => {
        setTags((prev) => [...prev, { ...newTag, id: Date.now() }]);
    };

    const handleUpdateTag = (updatedTag) => {
        setTags((prev) => prev.map((t) => (t.id === updatedTag.id ? updatedTag : t)));
    };

    const handleDeleteTag = (tagId) => {
        setTags((prev) => prev.filter((t) => t.id !== tagId));
    };

    // Filtering Functions
    const multiDayData = useMemo(() => {
    if (!selectedDay) {return {};};

    const startDate = new Date(selectedDay.year, selectedDay.month - 1, selectedDay.day);

    const dayObjects = [];
    
    for (let i = 0; i < 3; i++) {
        const currentDayDate = addDays(startDate, i);
        
        dayObjects.push({
            date: currentDayDate,
            id: formatDateId(currentDayDate),
            ...getFormattedDate(currentDayDate)
        });
    }

    const tasksForDisplayDays = tasks.filter(task => 
        dayObjects.some(day => day.id === task.dayId)
    );
    
    const finalFilteredTasks = tasksForDisplayDays.filter(task => {
        if (selectedTags.length === 1 && selectedTags.includes(0)) {
            return true;
        }
        return task.tags.some(tagId => selectedTags.includes(tagId));
    });

    const multiDayView = dayObjects.map(dayObj => {
        const tasksForThisDay = finalFilteredTasks.filter(t => t.dayId === dayObj.id);
        
        return {...dayObj, tasks: tasksForThisDay,};
    });

    return {multiDayView};

    }, [tasks, selectedDay, selectedTags]);

    const contextValue = {
        tasks,
        setTasks,
        tags,
        setTags,
        selectedDay,
        setSelectedDay,
        selectedTags,
        setSelectedTags,
        
        // Modals
        isAddTaskModalOpen,
        setAddTaskModalOpen,
        isEditModalOpen,
        setEditModalOpen,
        editingTask,
        setEditingTask,
        clickedDay,
        setClickedDay,
        
        //Sidebar
        isOpen,
        setIsOpen,
        
        // Functions
        addTask,
        updateTask,
        deleteTask,
        handleAddTag,
        handleUpdateTag,
        handleDeleteTag,
        
        // Filtered tasks
        multiDayView: multiDayData.multiDayView,
        allTasks: tasks,
    };

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
}