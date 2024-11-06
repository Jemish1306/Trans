// src/components/modals/FindReplaceModal.jsx
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const FindReplaceModal = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 shadow-xl rounded-xl">
    <div className="bg-black text-white p-8 rounded-lg w-[534px] relative">
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-xl">✕</button>

      {/* Modal Title */}
      <h2 className="text-2xl font-semibold mb-6">Find & Replace</h2>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Find</label>
          <input
            type="text"
            placeholder="Enter text to find"
            className="w-full p-3 bg-black border border-white  text-white rounded-full focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Replace</label>
          <input
            type="text"
            placeholder="Enter replacement text"
            className="w-full p-3 bg-black border-white border text-white rounded-full focus:outline-none"
          />
        </div>
      </div>

      {/* Options */}
      <div className="flex items-center space-x-4 mb-8 text-sm">
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-neon-yellow" />
          <span className="ml-2">Match Case</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-neon-yellow" />
          <span className="ml-2">Whole Words Only</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="bg-gray-700 text-white p-2 border border-white rounded-full">
            <FaArrowLeft />
          </button>
          <button className="bg-gray-700 text-white p-2 border border-white rounded-full">
            <FaArrowRight />
          </button>
        </div>
        <div className="flex space-x-4">
          <button onClick={onClose} className="px-6 py-2 rounded-full border border-white text-white hover:bg-gray-700">Replace All</button>
          <button className="px-6 py-2 rounded-full bg-neon-yellow text-black font-semibold hover:bg-yellow-500">Replace</button>
        </div>
      </div>
    </div>
  </div>
);

export default FindReplaceModal;
