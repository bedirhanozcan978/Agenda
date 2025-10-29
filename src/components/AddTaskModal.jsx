import { useState,useEffect } from "react";

function AddTaskModal({ isOpen, onClose, day, addTask }) {

    const [name, setName] = useState("");
    const [start, setStart] = useState("09:00");
    const [end, setEnd] = useState("10:00");
    const [tag, setTag] = useState("All");
    const [date, setDate] = useState("");

    useEffect(() => {
    if (day) {
      setDate(`${day.year}-${String(day.month).padStart(2, "0")}-${String(day.day).padStart(2, "0")}`);
    }
  }, [day, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({
            id: Date.now(),
            dayId: day.id,
            title: name,
            start,
            end,
            done: false,
            tag,
        });
        onClose();
    };

    return (
        <>
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}/>
      
        <div className="fixed top-1/2 font-lalezar left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-creme p-6 rounded-xl z-50 w-120 flex flex-col items-center shadow-lg">
            <h2 className="text-xl mb-3">Add Task</h2>
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                <label htmlFor="Taskname" className="flex flex-col"> Task Date*
                    <input type="date" placeholder="Task Date" value={date} id="Taskname" className="border px-3 w-100 py-2 rounded" onChange={(e) => setDate(e.target.value)} required/>
                </label>
                <label htmlFor="Taskname" className="flex flex-col"> Task Name*
                    <input type="text" placeholder="Task Name" value={name} id="Taskname" className="border px-3 w-100 py-2 rounded" onChange={(e) => setName(e.target.value)} required/>
                </label>
                <div className="w-100 flex flex-row justify-between">
                <label htmlFor="TaskStart" className="flex flex-col"> Start Time*
                    <input type="time" placeholder="Start Time" value={start} id="TaskStart" className="border px-3 w-45 py-2 rounded" onChange={(e) => setStart(e.target.value)}/>
                </label>

                <label htmlFor="TaskEnd" className="flex flex-col"> End Time*
                    <input type="time" placeholder="End Time" value={end} id="TaskEnd" className="border px-3 w-45 py-2 rounded" onChange={(e) => setEnd(e.target.value)}/>
                </label>
                </div>
                <label htmlFor="Tags" className="flex flex-col"> Tags*
                    <input type="text" placeholder="Tag Name" value={tag} id="Tags" className="border px-3 w-100 py-2 rounded" onChange={(e) => setTag(e.target.value)} required/>
                </label>

                <div className="flex justify-end space-x-2">
                    <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-ocean text-white rounded">Add</button>
                </div>
            </form>
        </div>
        </>
  );
}

export default AddTaskModal;