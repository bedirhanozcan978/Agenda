import { useState } from 'react'
import useLocalStorage from "./hooks/useLocalStorage";
import './assets/styles/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import Sidebar from './components/Sidebar'
import DayView from './components/DayView'
import Header from './components/Header'

function App() {

  const defaultTags = [{ id: 0, name: "All", color: "#9ED36F" }];
  const [tags, setTags] = useLocalStorage("agenda:tags", defaultTags);

  return (
    <>
      <div className="flex h-screen bg-sand text-gray-900">
      <Sidebar tags={tags} setTags={setTags}/>
      <div className="flex flex-col flex-1">
        <Header />
        <DayView />
      </div>
    </div>
    </>
  );
};

export default App
