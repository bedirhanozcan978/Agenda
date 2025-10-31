import { useState,useEffect, useRef } from "react";

function AddTaskModal({ isOpen, onClose, day, addTask, tags }) {

    const [name, setName] = useState("");
    const [start, setStart] = useState("09:00");
    const [end, setEnd] = useState("10:00");
    const [selectedTags, setSelectedTags] = useState(addTask?.tags || [0]);
    const [date, setDate] = useState("");

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
    if (day) {
      setDate(`${day.year}-${String(day.month).padStart(2, "0")}-${String(day.day).padStart(2, "0")}`);
    }
  }, [day, isOpen]);

    useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({
            id: Date.now(),
            dayId: date,
            title: name,
            start,
            end,
            done: false,
            tags: selectedTags,
        });
        onClose();
    };

    return (
        <>
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}/>
      
        <div className="fixed top-1/2 font-lalezar left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-creme p-6 rounded-xl z-50 w-11/12 max-w-lg md:max-w-md flex flex-col items-center shadow-lg">
            <h2 className="text-xl mb-3">Add Task</h2>
            <form className="flex flex-col w-full space-y-3" onSubmit={handleSubmit}>
                <label htmlFor="Taskname" className="flex flex-col"> Task Date*
                    <input type="date" placeholder="Task Date" value={date} id="Taskname" className="border px-3 w-full py-2 rounded" onChange={(e) => setDate(e.target.value)} required/>
                </label>
                <label htmlFor="Taskname" className="flex flex-col"> Task Name*
                    <input type="text" placeholder="Task Name" value={name} id="Taskname" className="border px-3 w-full py-2 rounded" onChange={(e) => setName(e.target.value)} required/>
                </label>
                <div className="w-full flex flex-col sm:flex-row justify-between gap-3">
                <label htmlFor="TaskStart" className="flex flex-col"> Start Time*
                    <input type="time" placeholder="Start Time" value={start} id="TaskStart" className="border px-3 w-full py-2 rounded" onChange={(e) => setStart(e.target.value)}/>
                </label>

                <label htmlFor="TaskEnd" className="flex flex-col"> End Time*
                    <input type="time" placeholder="End Time" value={end} id="TaskEnd" className="border px-3 w-full py-2 rounded" onChange={(e) => setEnd(e.target.value)}/>
                </label>
                </div>
                <label className="flex flex-col relative" ref={dropdownRef}>
                    Tags*
                    <button
                    type="button"
                    className="border px-3 py-2 rounded text-left w-full"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {selectedTags.length > 0 
                        ? `${selectedTags.length} selected` 
                        : "Select Tags"}
                    </button>

                    {dropdownOpen && (
                        <div className="absolute z-50 mt-1 w-full max-h-40 overflow-y-auto border rounded bg-white shadow-lg">
                            {tags.map(tag => (
                                <label key={tag.id} className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 cursor-pointer">
                                    <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag.id)}
                                    disabled={tag.name === "All"}
                                    onChange={() => {
                                    if (selectedTags.includes(tag.id)) {
                                        setSelectedTags(selectedTags.filter(id => id !== tag.id));
                                    } else {
                                        setSelectedTags([...selectedTags, tag.id]);
                                    }
                                    }}
                                    />
                                    <span style={{ color: tag.color }}>{tag.name}</span>
                                </label>
                            ))}
                        </div>
                    )}
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