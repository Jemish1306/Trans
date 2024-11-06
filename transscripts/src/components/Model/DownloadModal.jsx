// src/components/modals/DownloadModal.jsx
import React from 'react';

const DownloadModal = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-8">
    <div className="bg-black text-white p-10 rounded-lg w-auto relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-lg">X</button>
      
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6">Download Transcript</h2>
      
      {/* File Type Label */}
      <label className="block text-sm mb-2">File Type</label>
      
      {/* File Type Dropdown */}
      <div className="relative mb-6 bg-black ">
        <select className="appearance-none w-full bg-black py-3 px-4 bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none">
          <option>Microsoft Word</option>
          <option>TXT</option>
          <option>PDF</option>
        </select>
        <span className="absolute right-4 top-3 text-gray-400 pointer-events-none">▼</span>
      </div>

      {/* Additional Export Options */}
      <h3 className="text-sm font-semibold mb-3">Additional Export Options</h3>
      <div className="grid grid-cols-2 gap-2 text-sm mb-6">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" />
          <span>Export Highlighted Sections Only</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" />
          <span>Include Speaker Names</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" />
          <span>Include Time Stamps</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" />
          <span>Lorem ipsum</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" />
          <span>Lorem ipsum dolor sit</span>
        </label>
      </div>

      {/* Asset Link */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 flex justify-between items-center text-sm">
        <span>Looking for the asset that was transcribed?</span>
        <button className="text-neon-yellow font-semibold hover:underline">Download</button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button onClick={onClose} className="text-white border border-gray-600 rounded-full px-6 py-3 text-sm hover:bg-gray-700">
          Cancel
        </button>
        <button className="bg-neon-yellow text-black rounded-full px-6 py-3 text-sm font-semibold hover:bg-yellow-500">
          Download Transcript
        </button>
      </div>
    </div>
  </div>
);

export default DownloadModal;
