import { useState } from "react";

function EditTagModal({ isOpen, onClose, tag, onUpdate, onDelete }) {
  
  if (!isOpen || !tag) return null;
    
  const [id, setId] = useState(tag?.id || null);
  const [name, setName] = useState(tag?.name || "");
  const [color, setColor] = useState(tag?.color || "#000000");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate({ ...tag, name, color });
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-creme p-6 rounded-xl z-50 w-80 shadow-lg">
        <h2 className="text-xl mb-1">Edit Tag</h2>
        <form onSubmit={handleUpdate} className="flex flex-col space-y-3">
          <label htmlFor="tagname"> Tag Name*
            <input type="text" value={name} id="tagname" className="border px-3 py-2 rounded" onChange={(e) => setName(e.target.value)} required/>
          </label>

          <label htmlFor="tagcolor"> Custom Color<br/>
            <input type="color" value={color} id="tagcolor" className="w-16 h-10 rounded" onChange={(e) => setColor(e.target.value)}/>
          </label>   

          <div className="flex justify-between items-center mt-2">
            <button type="button" onClick={() => setConfirmDelete(true)} className="px-4 py-2 bg-red-500 text-white rounded">Remove</button>
            <div className="flex space-x-2">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-ocean text-white rounded">Save</button>
            </div>
          </div>
        </form>

        {/* Confirm Delete */}
        {confirmDelete && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg flex flex-col space-y-3">
              <p>Are you sure?</p>
              <div className="flex justify-end space-x-2">
                <button onClick={() => setConfirmDelete(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button onClick={() => { onDelete(id); onClose(); }} className="px-4 py-2 bg-red-500 text-white rounded">Yes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EditTagModal;