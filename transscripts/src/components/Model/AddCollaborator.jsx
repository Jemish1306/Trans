import React, { useState } from 'react';

const AddCollaborator = ({ onClose }) => {
  const [newCollaborator, setNewCollaborator] = useState({ email: '', role: 'Editor' });
  const [collaborators, setCollaborators] = useState([]);

  const handleAddCollaborator = () => {
    if (newCollaborator.email.trim() === '') return; // Prevent empty emails from being added

    // Generate initials from the email
    const initials = newCollaborator.email
      .split('@')[0]
      .split(' ')
      .map(word => word[0].toUpperCase())
      .join('');

    // Add new collaborator to the list
    const newEntry = {
      name: newCollaborator.email,
      email: newCollaborator.email,
      role: newCollaborator.role,
      initials
    };

    setCollaborators([...collaborators, newEntry]);
    setNewCollaborator({ email: '', role: 'Editor' }); // Clear the input fields
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-black text-white p-6 rounded-lg w-[600px] relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-xl font-semibold">✕</button>
        <h2 className="text-2xl font-semibold mb-4">Add a Collaborator</h2>
        <p className="text-sm text-gray-400 mb-6">
          Add a collaborator by entering their email address in the field below.
        </p>

        {/* Input Field with Role Dropdown */}
        <div className="flex items-center space-x-2 mb-6 m-4 border-white border rounded-full">
          <input
            type="email"
            value={newCollaborator.email}
            onChange={(e) => setNewCollaborator({ ...newCollaborator, email: e.target.value })}
            placeholder="Add email"
            className="w-full p-3 bg-gray-800 text-white rounded-full bg-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-neon-yellow"
          />
          <select
            value={newCollaborator.role}
            onChange={(e) => setNewCollaborator({ ...newCollaborator, role: e.target.value })}
            className="bg-gray-800 text-white rounded-lg bg-black cursor-pointer outline-none"
          >
            <option>Editor</option>
            <option>Viewer</option>
            <option>Manager</option>
          </select>
        </div>

        {/* Collaborators with Access Section */}
        <h3 className="text-lg font-semibold mb-4">Collaborators with Access</h3>
        <div className="space-y-4 mb-6">
          {collaborators.length > 0 ? (
            collaborators.map((collaborator, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Initials */}
                  <div className="bg-gray-600 w-10 h-10 border border-white text-textcolor flex items-center justify-center rounded-full font-semibold">
                    {collaborator.initials}
                  </div>
                  {/* Name and Email */}
                  <div>
                    <p className="font-semibold">{collaborator.email}</p>
                    <p className="text-gray-400 text-sm">{collaborator.email}</p>
                  </div>
                </div>
                {/* Role */}
                <div>
                  <select
                    value={collaborator.role}
                    onChange={(e) => {
                      const updatedCollaborators = [...collaborators];
                      updatedCollaborators[index].role = e.target.value;
                      setCollaborators(updatedCollaborators);
                    }}
                    className="bg-gray-800 text-white bg-black p-2 rounded-lg border border-gray-600 cursor-pointer outline-none"
                  >
                    <option>Editor</option>
                    <option>Viewer</option>
                    <option>Manager</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No collaborators added yet.</p>
          )}
        </div>

        {/* General Access Section */}
        <h3 className="text-lg font-semibold mb-4">General Access</h3>
        <div className="bg-gray-800 p-4 rounded-lg mb-6 flex items-center justify-between bg-dark-gray">
          <div>
            <p className="text-sm font-semibold">Anyone with the link can</p>
            <p className="text-gray-400 text-xs">This link lets anyone view the transcription in the editor.</p>
          </div>
          <button className="border border-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition">
            Copy Link
          </button>
        </div>

        {/* Done Button */}
        <button
          onClick={handleAddCollaborator}
          className="bg-gray-600 text-white px-4 py-2 bg-dark-gray border border-white rounded-full text-lg font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AddCollaborator;
