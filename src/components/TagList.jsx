import { useState, useEffect, useRef } from "react";
import AddTagModal from "./AddTagModal";
import EditTagModal from "./EditTagModal";

export default function TagList({tags, setTags}) {

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

  // Add Tag Function
  useEffect(() => {
    const savedTags = JSON.parse(localStorage.getItem("tags")) || [];
    setTags(savedTags);
  }, []);

  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  const handleAddTag = (newTag) => {
    const tagWithId = { ...newTag, id: Date.now() };
    setTags((prev) => [...prev, tagWithId]);
    setAddModalOpen(false);
  };

  // Edit Tag Function
  const handleUpdateTag = (updatedTag) => {
  setTags((prevTags) =>
    prevTags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
  );
  setEditTagModalOpen(false);
  };

  // Delete Tag Function
  const handleDeleteTag = (tagId) => {
  setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
  setEditTagModalOpen(false);
  };

  return (
  <>  

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
        { tags && tags.map((tag) => (
          
          <div key = {tag.id} className="flex flex-row justify-between text-xl">
            <div className="flex flex-row">
              <p style={{ color: tag.color }} className="mr-3">#</p>
              <p>{tag.name}</p>
            </div>
            <div>
              <button onClick={() => {setSelectedTag(tag); setEditTagModalOpen(true);}}><i className="fa fa-pencil w-4 h-4"/></button>
            </div>
          </div>

          ))
        }

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>

  </>
  );
}
