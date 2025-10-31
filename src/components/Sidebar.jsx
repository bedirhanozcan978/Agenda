import Calendar from "./Calendar";
import TagList from "./TagList";
import ArrowDown from '../assets/img/arrow-to-line.svg?react';

export default function Sidebar({tags, setTags, selectedDay, setSelectedDay, selectedTags, setSelectedTags, setAddTaskModalOpen, isOpen, setIsOpen}) {
  
  //Sidebar Toggle
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside className={`bg-creme shadow-2xl/30 font-lalezar transition-all duration-300 flex flex-col 
      fixed top-0 left-0 h-full z-40
      ${isOpen ? "w-64" : "w-0"}
      ${isOpen ? "" : "overflow-hidden"}
      md:relative md:top-auto md:left-auto md:h-auto md:z-auto
      md:${isOpen ? "w-64" : "w-16"}
    `}>

      {/* Logo & Toggle */}
      <div className="flex items-center justify-between p-3 md:p-4">
        <h1 className={`text-3xl md:text-4xl text-ocean font-bold transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>Agenda</h1>
        <button onClick={toggleSidebar} className="md:hidden">
                  <ArrowDown className={`text-ocean w-6 md:w-7 h-6 md:h-7 transform transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-180'}`} />
              </button>
      </div>

      {/* Create Button */}
      {isOpen && (
        <div className="w-full flex justify-center items-center py-1 md:py-2">
          <button
            className="bg-ocean text-white text-lg md:text-2xl rounded-full px-3 md:px-5 py-1 md:py-2 hover:cursor-pointer hover:bg-hoverocean"
            onClick={() => setAddTaskModalOpen(true)}
          >
            + Create
          </button>
        </div>
      )}

      {/* Calendar & TagList */}
      {isOpen && (
        <div className="flex-1 overflow-auto scrollbar-hide">
          <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
          <TagList tags={tags} setTags={setTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
        </div>
      )}
    </aside>

  )
}
