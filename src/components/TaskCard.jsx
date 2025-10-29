export default function TaskCard({ task, updateTask, onEdit }) {
  
  const handleToggleDone = () => {
    updateTask({ ...task, done: !task.done });
  };

  return (
    <div className="bg-creme rounded-xl shadow p-3 flex flex-col justify-between items-start">
      
      <div className="w-full flex flex-row justify-between">
        <p className="text-xl">{task.title}</p>
        <button onClick={onEdit}><i className="fa fa-pencil w-4 h-4"/></button>
      </div>

      <div className="w-full flex flex-row justify-between items-baseline pt-2 text-lg">
        <div className="flex items-baseline cursor-pointer" onClick={handleToggleDone}>
          <label htmlFor={`task-${task.id}`} className="flex cursor-pointer space-x-2">
            Done
            <div className="relative ml-1 w-4 h-4">
              <input type="checkbox" checked={task.done} className="appearance-none w-full h-full border-2 rounded-full border-gray-600 checked:border-green" />
              {task.done && (<i className={`fa fa-check text-sm text-green absolute inset-0 m-auto`}></i>)}
            </div>  

          </label>
        </div>
        <p className="text-gray-600">{task.start} / {task.end}</p>
      </div>

      <div className="w-full flex flex-row border-t border-gray-600">
        <p className="text-sm pr-1">Tags:</p>
        <p className="text-sm pr-1 text-blue-600">{task.tag}</p>
      </div>

    </div>
  )
}
