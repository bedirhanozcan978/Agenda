import { useState } from "react";

function AddTagModal({ isOpen, onClose, onAdd }) {
  
    const [name, setName] = useState("");
    const [color, setColor] = useState("#9ED36F");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({name, color});
        onClose();
    };

    return (
        <>
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}/>
      
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-creme p-6 rounded-xl z-50 w-80 shadow-lg">
            <h2 className="text-xl mb-1">Add Tag</h2>
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                <label htmlFor="tagname"> Tag Name*
                    <input type="text" placeholder="Tag Name" id="tagname" className="border px-3 py-2 rounded" value={name} onChange={(e) => setName(e.target.value)} required/>
                </label>
          
                <label htmlFor="customcolor"> Custom Color<br/>
                    <input type="color" id="customcolor" className="w-16 h-10 rounded" value={color} onChange={(e) => setColor(e.target.value)}/>
                </label>

                <div className="flex justify-end space-x-2">
                    <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-ocean text-white rounded">Add</button>
                </div>
            </form>
        </div>
        </>
  );
}

export default AddTagModal;