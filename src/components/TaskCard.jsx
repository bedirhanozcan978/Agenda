export default function TaskCard({ task }) {
  return (
    <div className="bg-creme rounded-xl shadow p-3 flex justify-between items-center">
      <div>
        <p className="">{task.title}</p>
        <p className="text-sm text-gray-600">{task.start} / {task.end}</p>
        <p className="text-xs text-blue-600">#{task.tag}</p>
      </div>
      <div>
        <input type="checkbox" checked={task.done} className="scale-125 accent-green-600" />
      </div>
    </div>
  )
}
