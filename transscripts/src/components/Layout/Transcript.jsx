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

  // Toggle speaker popup visibility
  const toggleSpeakerPopup = () => setIsSpeakerPopupOpen((prev) => !prev);

  // Event listener for clicks outside context menu and speaker popup
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

  // Utility function to wrap selected text with a specific style
  const wrapSelectedText = (className) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.className = className;
    range.surroundContents(span);

    // Clear selection after applying the style
    selection.removeAllRanges();
    selection.addRange(range);
  };

  // Formatting functions
  const formatBold = () => wrapSelectedText('font-bold');
  const formatItalic = () => wrapSelectedText('italic');
  const formatUnderline = () => wrapSelectedText('underline');
  const formatStrikethrough = () => wrapSelectedText('line-through');
  const formatHighlight = () => wrapSelectedText('bg-yellow-200'); // Yellow background for highlight

  const copyText = () => document.execCommand('copy');
  const cutText = () => document.execCommand('cut');
  const deleteText = () => {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      selection.deleteFromDocument();
    }
  };

  return (
    <div onContextMenu={handleRightClick} className="overflow-y-auto shadow-lg gap-6 p-4" contentEditable>
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
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onBold={formatBold}
          onItalic={formatItalic}
          onUnderline={formatUnderline}
          onStrikethrough={formatStrikethrough}
          onHighlight={formatHighlight}
          onCopy={copyText}
          onCut={cutText}
          onDelete={deleteText}
        />
      )}

      {/* Speaker Popup */}
      {isSpeakerPopupOpen && (
        <div className="speaker-popup absolute ml-28 top-64 bg-black text-white rounded-xl space-y-4 shadow-lg p-4 z-50 w-auto">
          <h3 className="text-lg font-semibold mb-4">Speakers</h3>
          {/* Speaker options */}
          <button className="w-full mt-2 py-2 bg-neon-yellow text-black rounded-full">Add New Speaker +</button>
        </div>
      )}
    </div>
  );
};

export default Transcript;









// // src/components/Transcript.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';

// const Transcript = ({ jobTitle }) => {
//   const [entries, setEntries] = useState([]);
//   const [status, setStatus] = useState('Fetching transcription...');

//   useEffect(() => {
//     if (jobTitle) {
//       // Function to fetch transcription data
//       const fetchTranscription = async () => {
//         try {
//           const response = await axios.get(`http://localhost:3000/transcription/${jobTitle}`);
//           if (response.data.transcriptUrl) {
//             const transcriptResponse = await axios.get(response.data.transcriptUrl);
//             setEntries(transcriptResponse.data.results.transcripts || []);
//             setStatus('Transcription completed');
//           } else {
//             setStatus(response.data.message || 'Transcription in progress...');
//           }
//         } catch (error) {
//           console.error('Error fetching transcription:', error);
//           setStatus('Error retrieving transcription.');
//         }
//       };

//       // Set up interval to poll the transcription status every 5 seconds
//       const intervalId = setInterval(fetchTranscription, 5000);

//       // Cleanup interval on component unmount
//       return () => clearInterval(intervalId);
//     }
//   }, [jobTitle]);

//   return (
//     <div className="transcript overflow-y-auto shadow-lg gap-6 p-4">
//       <h2>{status}</h2>
//       {entries.length > 0 ? (
//         entries.map((entry, index) => (
//           <div key={index} className="p-6 rounded-lg shadow-md bg-light-crim">
//             <div className="flex items-center space-x-3 mb-2">
//               <div className="px-4 py-2 rounded-full text-white bg-blue-400 cursor-pointer">
//                 <span className="font-semibold">Speaker {index + 1}</span>
//               </div>
//             </div>
//             <div className="pl-6 border-l-2 border-gray-200">
//               <p className="text-gray-800">{entry.transcript}</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500">No transcription entries available.</p>
//       )}
//     </div>
//   );
// };

// Transcript.propTypes = {
//   jobTitle: PropTypes.string,
// };

// export default Transcript;



