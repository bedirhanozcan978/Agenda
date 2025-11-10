import { TaskProvider } from './context/TaskContext.jsx'; 
import useTaskContext from './hooks/useTaskContext.jsx'; 
import './assets/styles/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Sidebar from './components/Sidebar';
import DayView from './components/DayView';
import Header from './components/Header';

function Layout() {

  const { 
    isOpen, 
    selectedDay, 
  } = useTaskContext();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-sand text-gray-900">
      
      <Sidebar />
      
      <div className={`
        flex-1 flex flex-col overflow-auto
        transition-all duration-300
        md:${isOpen ? "ml-64" : "md:ml-16"}
      `}>

        <Header />

        {selectedDay && (
          <DayView/>
        )}
      </div>
    </div>
  );
}


export default function AppWrapper() {
  return (
    <TaskProvider>
      <Layout />
    </TaskProvider>
  );
}