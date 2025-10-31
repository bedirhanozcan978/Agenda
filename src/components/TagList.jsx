import { useState, useEffect, useRef } from "react";
import AddTagModal from "./AddTagModal";
import EditTagModal from "./EditTagModal";

export default function TagList({tags, setTags, selectedTags, setSelectedTags}) {

  // Taglist Scroll Function
  const scrollRef = useRef(null);

  const handleMouseDown = (e) => {
    const el = scrollRef.current;
    el.isDown = true;
    el.startY = e.pageY - el.offsetTop;
    el.scrollTopStart = el.scrollTop;
  };

  const handleMouseLeave = () => (scrollRef.current.isDown = false);
  const handleMouseUp = () => (scrollRef.current.isDown = false);

  const handleMouseMove = (e) => {
    const el = scrollRef.current;
    if (!el.isDown) return;
    e.preventDefault();
    const y = e.pageY - el.offsetTop;
    const walk = (y - el.startY)
    el.scrollTop = el.scrollTopStart - walk;
  };     

  // Add & Edit Modals
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const [isEditTagModalOpen, setEditTagModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  // Tags CRUD
  const handleAddTag = (newTag) => {
    setTags((prev) => [...prev, { ...newTag, id: Date.now() }]);
    setAddModalOpen(false);
  };

  const handleUpdateTag = (updatedTag) => {
    setTags((prev) => prev.map((t) => (t.id === updatedTag.id ? updatedTag : t)));
    setEditTagModalOpen(false);
  };

  const handleDeleteTag = (tagId) => {
    setTags((prev) => prev.filter((t) => t.id !== tagId));
    setEditTagModalOpen(false);
  };

  //Selected Tag
  const toggleTag = (tagId) => {

  if (tagId === 0) return;

  let newSelectedTags = [];
  if (selectedTags.includes(tagId)) {
    newSelectedTags = selectedTags.filter(id => id !== tagId);
  } else {

    newSelectedTags = [...selectedTags.filter(id => id !== 0), tagId]; // All tagini çıkar
  }

  if (newSelectedTags.length === 0) newSelectedTags = [0];

  setSelectedTags(newSelectedTags);
  };

  return (
  <div className="w-full max-w-md mx-auto py-5">  

    <EditTagModal isOpen={isEditTagModalOpen} tag={selectedTag} onClose={() => setEditTagModalOpen(false)} onUpdate={handleUpdateTag} onDelete={handleDeleteTag}/>

    <AddTagModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddTag}/>
    <button className="px-4 text-xl text-ocean" onClick={() => setAddModalOpen(true)}>Add Tag +</button>
    
    <div className="relative w-full max-w-md mx-auto py-5 select-none">

      <div className="absolute top-0 left-0 right-0 h-2 pointer-events-none bg-gradient-to-b from-black/20 to-transparent"></div>

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="overflow-y-auto max-h-50 flex flex-col -my-5 space-y-2 px-4 scrollbar-hide cursor-grab active:cursor-grabbing"
      >
        {tags && tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.id);
          return (
        
            <div key = {tag.id} className="flex flex-row justify-between text-xl" style={{backgroundColor: isSelected ? tag.color : "transparent",color: isSelected ? "white" : tag.color,}}>
              <div className="flex flex-row" onClick={() => toggleTag(tag.id)}> 
                <p style={{color: isSelected ? "white" : tag.color}} className="mr-3">#</p> 
                <p>{tag.name}</p> 
              </div> 
              <div> 
                {tag.id !== 0 &&
                  <button onClick={() => {setSelectedTag(tag); setEditTagModalOpen(true);}}>
                    <i className="fa fa-pencil tex-xs"/>
                  </button>
                }
              </div> 
            </div>

          );
        })}

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>

  </div>
  );
}
