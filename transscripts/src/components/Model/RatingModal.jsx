// src/components/Model/RatingModal.jsx
import React, { useState } from 'react';

const RatingModal = ({ onClose }) => {
  const [rating, setRating] = useState(0); // Track selected rating

  // Handle star click
  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-black text-white p-6 rounded-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-white">X</button>
        <h2 className="text-lg font-bold mb-4">Thanks for the rating!</h2>
        <p className="mb-4 text-gray-300">
          Wordibly's Quality Team will review the file and offer to re-start any files below our standards.
        </p>

      
       

        {/* Feedback Textarea */}
        <textarea
          className="w-full p-2 bg-black text-white rounded-lg mb-6 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-yellow"
          placeholder="How could we improve next time?"
          rows="3"
        ></textarea>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-700 text-white px-4 py-2 border border-white rounded-full rounded-full hover:bg-gray-600">Cancel</button>
          <button className="bg-neon-yellow text-black px-4 py-2 rounded-full hover:bg-yellow-500">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
