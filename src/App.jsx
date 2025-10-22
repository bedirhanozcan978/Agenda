import { useState } from 'react'
import './assets/styles/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import Sidebar from './components/Sidebar'
import DayView from './components/DayView'
import Header from './components/Header'

function App() {

  return (
    <>
      <div className="flex h-screen bg-sand text-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <DayView />
      </div>
    </div>
    </>
  );
};

export default App
