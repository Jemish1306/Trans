// src/components/modals/SpellingGrammarModal.jsx
import React from 'react';

const SpellingGrammarModal = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
    <div className="bg-black text-white p-8 rounded-lg w-[576px] relative">
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-xl">✕</button>

      {/* Modal Title */}
      <h2 className="text-2xl font-semibold mb-6">Spelling & Grammar</h2>

      {/* Progress Indicator */}
      <p className="text-sm mb-4">1 of 7</p>

      {/* Change Text */}
      <p className="text-lg font-medium mb-2">Change [<span className="italic">word or phrase</span>] to:</p>
      
      {/* Input Field */}
      <input
        type="text"
        placeholder="new word or phrase"
        className="w-full p-3  bg-black text-white border border-white rounded-full mb-6 focus:outline-none"
      />

      {/* Dictionary Edit Info */}
      <div className=" bg-dark-gray p-4 rounded-lg mb-6 text-sm">
        <p>If you don’t want <span className="italic">[insert word or phrase]</span> to be marked as misspelled in the future, you can add it to your custom dictionary.</p>
        <a href="#" className="text-neon-yellow underline mt-2 inline-block">Edit Custom Dictionary</a>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-full border border-white text-white hover:bg-gray-700"
        >
          Replace All
        </button>
        <button
          className="px-6 py-2 rounded-full bg-neon-yellow text-black font-semibold hover:bg-yellow-500"
        >
          Replace
        </button>
      </div>
    </div>
  </div>
);

export default SpellingGrammarModal;
