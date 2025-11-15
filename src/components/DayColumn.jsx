import useTaskContext from '../hooks/useTaskContext'; 
import TaskCard from './TaskCard';

export default function DayColumn ({dayData}){
    if (!dayData) return null;

    const {  
            setAddTaskModalOpen,
            setEditModalOpen,
            setEditingTask 
        } = useTaskContext();

    // Task Card Edit Button Handler
    const handleEditClick = (task) => {
        setEditingTask(task);
        setEditModalOpen(true);
    };

    const getLastHour = () => {
        if (dayData.tasks.length === 0) {
            return "09:00";
        }

        const i = dayData.tasks.length;
        const lastHour = dayData.tasks[i-1];
        return lastHour.end;
    };
    const nexTaskTime = getLastHour();

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
                    <p className="text-gray-950 bg-gray-300 px-2 rounded-full"> {nexTaskTime} </p>
                </div>
            </div>
        </div>
    );
};