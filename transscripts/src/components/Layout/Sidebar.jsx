
// src/components/Layout2/Sidebar.jsx
import React, { useState } from 'react';
import SpeakersList from './SpeakersList';
import MediaPlayer from './../Media/MediaPlayer';
import VersionHistory from './VersionHistory';
import TagsList from './TagsList';
import PropTypes from 'prop-types';
import TranscriptPlayer from './../Media/MediaPlayer1';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('Speakers');
 

  return (
    <div className="bg-light-crim w-1/4 space-y-4 p-2 shadow-xl">
      {/* Media Player Section */}
      <div className="bg-black shadow-lg text-off-white p-4 rounded-xl flex flex-col space-y-4">
       
      <MediaPlayer  /> {/* Pass setPlaying */}
      {/* <TranscriptPlayer/> */}
      
      </div>



      <div className="bg-black p-4 rounded-2xl shadow-xl h-auto">
        {/* Tab Navigation */}
        <div className="flex justify-between mb-4 px-2 bg-black border border-textcolor rounded-full p-1">
          {['Speakers', 'Tags', 'Version History'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg px-4 py-1 rounded-full  ${
                activeTab === tab
                  ? 'bg-neon-yellow text-primary-black border-neon-yellow'
                  : 'border-neon-yellow text-neon-yellow'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Speakers' && <SpeakersList />}
        {activeTab === 'Tags' && <TagsList />}
        {activeTab === 'Version History' && <VersionHistory />}
      </div>
    </div>
  );
};

export default Sidebar;
