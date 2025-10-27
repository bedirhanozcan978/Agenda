

function Calendar() {

     const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

  const days = [
    { day: 29, currentMonth: false },
    { day: 30, currentMonth: false },
    { day: 31, currentMonth: false },
    { day: 1, currentMonth: true },
    { day: 2, currentMonth: true },
    { day: 3, currentMonth: true },
    { day: 4, currentMonth: true },
    { day: 5, currentMonth: true },
    { day: 6, currentMonth: true },
    { day: 7, currentMonth: true },
    { day: 8, currentMonth: true },
    { day: 9, currentMonth: true },
    { day: 10, currentMonth: true },
    { day: 11, currentMonth: true },
    { day: 12, currentMonth: true },
    { day: 13, currentMonth: true },
    { day: 14, currentMonth: true },
    { day: 15, currentMonth: true },
    { day: 16, currentMonth: true },
    { day: 17, currentMonth: true },
    { day: 18, currentMonth: true },
    { day: 19, currentMonth: true },
    { day: 20, currentMonth: true },
    { day: 21, currentMonth: true },
    { day: 22, currentMonth: true },
    { day: 23, currentMonth: true },
    { day: 24, currentMonth: true },
    { day: 25, currentMonth: true },
    { day: 26, currentMonth: true },
    { day: 27, currentMonth: true },
    { day: 28, currentMonth: true },
    { day: 29, currentMonth: true },
    { day: 30, currentMonth: true },
    { day: 1, currentMonth: false },
    { day: 2, currentMonth: false },
    { day: 3, currentMonth: false },
    { day: 4, currentMonth: false },
    { day: 5, currentMonth: false },
    { day: 6, currentMonth: false },
    { day: 7, currentMonth: false },
    { day: 8, currentMonth: false },
    { day: 9, currentMonth: false },
  ];

    return(
      <div className="w-full p-4 max-w-md mx-auto">  
        <div className="w-full px-2 flex flex-row justify-between">
            <div>
                <i className="fa fa-arrow-left text-ocean"></i>
            </div>
            <div>
                <p className="text-xl">Janruary 2026</p>
            </div>
            <div>
                <i className="fa fa-arrow-right text-ocean"></i>
            </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center font-medium">
            {weekdays.map((day, idx) => (
              <div key={idx} className="text-gray-500">
                {day}
              </div>
            ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mt-1">
            {days.map((d, idx) => (
              <div key={idx} className={`p-0.5 rounded ${d.currentMonth ? "text-black font-semibold" : "text-gray-400"}`}>
                {d.day}
              </div>
            ))}
        </div>

      </div> 
    )
}

export default Calendar