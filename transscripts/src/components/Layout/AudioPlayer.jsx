// src/components/Layout2/AudioPlayer.jsx
import React from 'react';

const AudioPlayer = () => {
  return (
    <div className="bg-purple-100 p-4 mb-6 rounded-lg">
      <div className="flex justify-between items-center">
        <button className="bg-purple-500 text-white px-2 py-1 rounded">▶</button>
        <div>0:00 / 10:00</div>
        <button className="bg-purple-500 text-white px-2 py-1 rounded">1x</button>
      </div>
    </div>
  );
};

export default AudioPlayer;
