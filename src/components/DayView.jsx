import TaskCard from './TaskCard'

export default function DayView() {
  const tasks = [
    { id: 1, title: 'Morning Routine', start: '07:30', end: '08:00', done: true, tag: 'Personal' },
    { id: 2, title: 'Go To Work', start: '08:15', end: '18:00', done: false, tag: 'Work' }
  ]

  return (
   <>
   <div className="flex p-6 gap-4 font-lalezar">
      <div className="flex-1">
        <div className="px-4 flex flex-row items-baseline justify-between ">
          <h2 className="text-2xl mb-2">Thursday</h2> <h3 className="text-xl text-gray-600">Jan 01</h3>
        </div>
        <div className="flex flex-col gap-2">
          {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>

      <div className="flex-1">
        <div className="px-4 flex flex-row items-baseline justify-between ">
          <h2 className="text-2xl mb-2">Friday</h2> <h3 className="text-xl text-gray-600">Jan 02</h3>
        </div>
        <div className="flex flex-col gap-2">
          {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>

      <div className="flex-1">
        <div className="px-4 flex flex-row items-baseline justify-between ">
          <h2 className="text-2xl mb-2">Saturday</h2> <h3 className="text-xl text-gray-600">Jan 03</h3>
        </div>
        <div className="flex flex-col gap-2">
          {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>

    </div>
    </>
  )
}
