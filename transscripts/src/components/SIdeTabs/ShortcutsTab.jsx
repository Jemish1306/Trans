import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa'; 

const ShortcutsTab = () => {
  const [shortcuts, setShortcuts] = useState([
    { id: 1, name: 'Add a speaker', keybind: 'CTRL + S' },
    { id: 2, name: 'Play media', keybind: 'F9' },
    { id: 3, name: 'Stop media', keybind: 'F4' },
    { id: 4, name: 'Rewind media', keybind: 'F7' },
    { id: 5, name: 'Fast forward media', keybind: 'F8' },
    { id: 6, name: 'Crosstalk', keybind: 'CTRL + R' },
    { id: 7, name: 'Inaudible', keybind: 'CTRL + D' },
    { id: 8, name: 'Moderator', keybind: 'CTRL + M' },
    { id: 9, name: 'Respondent', keybind: 'CTRL + E' }
  ]);

  const handleKeybindChange = (id, newKeybind) => {
    const updatedShortcuts = shortcuts.map(sc => {
      if (sc.id === id) {
        return { ...sc, keybind: newKeybind };
      }
      return sc;
    });
    setShortcuts(updatedShortcuts);
  };

  const addNewShortcut = () => {
    const newShortcut = {
      id: shortcuts.length + 1, 
      name: 'New Shortcut',
      keybind: ''
    };
    setShortcuts([...shortcuts, newShortcut]);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      {shortcuts.map((shortcut) => (
        <div key={shortcut.id} className="mb-4">
          <h4 className="font-semibold">{shortcut.name}</h4>
          <input
            type="text"
            value={shortcut.keybind}
            onChange={(e) => handleKeybindChange(shortcut.id, e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter key combination"
          />
        </div>
      ))}
      <button onClick={addNewShortcut} className="flex items-center justify-center w-full bg-blue-500 text-white px-4 py-2 rounded shadow">
        <FaPlus /> Add New
      </button>
    </div>
  );
};

export default ShortcutsTab;
