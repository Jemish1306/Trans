// src/components/modals/KeyboardShortcutModal.jsx
import React from 'react';

const KeyboardShortcutModal = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
    <div className="bg-black text-white p-6 rounded-lg w-96 relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-white">X</button>
      <h2 className="text-lg font-bold mb-4">Keyboard Shortcuts</h2>
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">Playback Shortcuts</h3>
          <p>Pause & Play: TAB</p>
          {/* Add other shortcuts here */}
        </div>
        <div>
          <h3 className="font-semibold">Editor Shortcuts</h3>
          <p>Search: CMD + F</p>
          {/* Add other shortcuts here */}
        </div>
      </div>
    </div>
  </div>
);

export default KeyboardShortcutModal;
