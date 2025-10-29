import { useState, useEffect } from "react";

function EditTaskModal({ isOpen, onClose, day, updateTask, deleteTask, task }) {
  
  const [name, setName] = useState(task?.title || "");
  const [start, setStart] = useState(task?.start || "09:00");
  const [end, setEnd] = useState(task?.end || "10:00");
  const [tag, setTag] = useState(task?.tag || "All");  
  const [date, setDate] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (task) {
      setName(task.title);
      setStart(task.start);
      setEnd(task.end);
      setTag(task.tag);
      setDate(`${day.year}-${String(day.month).padStart(2, "0")}-${String(day.day).padStart(2, "0")}`);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask({ ...task, title: name, start, end, tag});
    onClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setConfirmDelete(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
        <div className="fixed top-1/2 font-lalezar left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-creme p-6 rounded-xl z-50 w-120 flex flex-col items-center shadow-lg">
            <h2 className="text-xl mb-3">Edit Task</h2>
            <form className="flex flex-col space-y-3" onSubmit={handleUpdate}>
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

          <div className="flex justify-between items-center mt-2">
            <button type="button" onClick={() => setConfirmDelete(true)} className="px-4 py-2 bg-red-500 text-white rounded">Remove</button>
            <div className="flex space-x-2">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-ocean text-white rounded">Save</button>
            </div>
          </div>
        </form>

        {/* Confirm Delete */}
        {confirmDelete && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg flex flex-col space-y-3">
              <p>Are you sure?</p>
              <div className="flex justify-end space-x-2">
                <button onClick={() => setConfirmDelete(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Yes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EditTaskModal;