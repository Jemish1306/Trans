// src/components/Layout/Transcript.jsx
import React, { useState, useEffect } from 'react';
import ContextMenu from './ContextMenu';

const Transcript = () => {
  const [contextMenu, setContextMenu] = useState(null);
  const [isSpeakerPopupOpen, setIsSpeakerPopupOpen] = useState(false);

  const entries = [
    {
      name: 'Dillon Bowser',
      time: '00:32',
      content: 'Lorem ipsum dolor sit amet. Imperdiet aliquet volutpat in massa tellus leo. Amet quam in et nisl integer etiam urna venenatis. A sed pellentesque libero mauris ullamcorper aliquam leo. Blandit massa vel cras morbi risus donec. Et sit dictum.',
      color: 'bg-pink-400',
    },
    {
      name: 'Maj Vestal',
      time: '00:49',
      content: 'Lorem ipsum dolor sit amet consectetur. Non tincidunt mauris blandit turpis dolor ac enim. Eu ultrices velit convallis cursus pellentesque ac commodo turpis. Nisl sed nibh consequat amet facilisi diam varius aliquam. Nulla id mi non integer at.',
      color: 'bg-blue-400',
    },
    {
      name: 'Dani Meluski-Jimenez',
      time: '01:13',
      content: 'Lorem ipsum dolor sit amet consectetur. Eu proin libero turpis scelerisque et purus. Non tincidunt mauris blandit turpis dolor ac enim. Eu ultrices velit convallis cursus pellentesque ac commodo turpis. Nisl sed nibh consequat amet facilisi diam varius aliquam. Nulla id mi non integer at.',
      color: 'bg-green-400',
    },
    {
      name: 'Jimenez Meluski',
      time: '02:07',
      content: 'Lorem ipsum dolor sit amet consectetur. Eu proin libero turpis scelerisque et purus. Non tincidunt mauris blandit turpis dolor ac enim. Eu ultrices velit convallis cursus pellentesque ac commodo turpis. Nisl sed nibh consequat amet facilisi diam varius aliquam. Nulla id mi non integer at.',
      color: 'bg-blue-400',
    },
  ];

  const handleRightClick = (event) => {
    event.preventDefault();
    setContextMenu({
      x: event.pageX,
      y: event.pageY,
    });
  };

  const closeContextMenu = () => setContextMenu(null);

  const toggleSpeakerPopup = () => {
    setIsSpeakerPopupOpen((prev) => !prev);
  };

  // Add an event listener to detect clicks outside the context menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.context-menu') && !event.target.closest('.speaker-popup')) {
        closeContextMenu();
        setIsSpeakerPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div onContextMenu={handleRightClick} className="overflow-y-auto shadow-lg gap-6 p-4">
      {entries.map((entry, index) => (
        <div key={index} className="p-6 rounded-lg shadow-md bg-light-crim">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`px-4 py-2 rounded-full text-white ${entry.color} cursor-pointer`} onClick={toggleSpeakerPopup}>
              <span className="font-semibold">{entry.name}</span>
            </div>
          </div>
          <div className="pl-6 border-l-2 border-gray-200">
            <div className="text-gray-500 text-sm mb-1">{entry.time}</div>
            <p className="text-gray-800">{entry.content}</p>
          </div>
        </div>
      ))}

      {/* Context Menu */}
      {contextMenu && (
        <div className="context-menu" style={{ position: 'absolute' }} onClick={closeContextMenu}>
          <ContextMenu x={contextMenu.x} y={contextMenu.y} />
        </div>
      )}

      {/* Speaker Popup */}
      {isSpeakerPopupOpen && (
        <div className="speaker-popup  absolute ml-28 top-64 bg-black text-white rounded-xl space-y-4 shadow-lg p-4 z-50 w-auto">
          <h3 className="text-lg font-semibold mb-4">Speakers</h3>
          {[
            { name: 'Dillon Bowser', color: 'bg-pink-400' },
            { name: 'Maj Vestal', color: 'bg-blue-700' },
            { name: 'Lydia Mansel', color: 'bg-blue-400' },
            { name: 'Dani Meluski-Jimenez', color: 'bg-green-500' },
            { name: 'Andrew Tejerina', color: 'bg-orange-500' },
          ].map((speaker, index) => (
            <div
              key={index}
              className={`flex items-center justify-between px-4 py-2 mb-2 rounded-full ${speaker.color} text-white cursor-pointer`}
            >
              <span className="font-medium">{speaker.name}</span>
            </div>
          ))}
          <button className="w-full mt-2 py-2 bg-neon-yellow text-black rounded-full">Add New Speaker +</button>
        </div>
      )}
    </div>
  );
};

export default Transcript;






// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';


//  const Transcript = ({ transcriptionId, playing }) => {
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     if (transcriptionId && playing) { // Fetch data only when playing
//       const fetchTranscription = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/api/transcription/${transcriptionId}`);
//           setEntries(response.data);
//           console.log('response', response) // Debug line
//         } catch (error) {
//           console.error('Error fetching transcription:', error);
//         }
//       };
//       fetchTranscription();
//     }
//   }, [transcriptionId, playing]); // Depend on playing state


//   return (
//     <div className="overflow-y-auto shadow-lg gap-6 p-4">
//       {entries.map((entry, index) => (
//         <div key={index} className="p-6 rounded-lg shadow-md bg-light-crim">
//           <div className="flex items-center space-x-3 mb-2">
//             <div className="px-4 py-2 rounded-full text-white bg-blue-400 cursor-pointer">
//               <span className="font-semibold">{entry.speaker}</span>
//             </div>
//           </div>
//           <div className="pl-6 border-l-2 border-gray-200">
//             <div className="text-gray-500 text-sm mb-1">{entry.time}</div>
//             <p className="text-gray-800">{entry.text}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// Transcript.propTypes = {
//   transcriptionId: PropTypes.string,
//   playing: PropTypes.bool.isRequired,
// };

// export default Transcript;



