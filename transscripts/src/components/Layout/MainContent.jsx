// // src/components/Layout2/MainContent.jsx
// import React, { useState } from 'react';
// import { FaUndo, FaRedo, FaFont, FaSearch, FaKeyboard, FaSave } from 'react-icons/fa';
// import Transcript from './Transcript';

// import FindReplaceModal from './../Model/FindReplaceModal';
// import SpellingGrammarModal from './../Model/SpellingGrammarModal';
// import KeyboardShortcutModal from './../Model/KeyboardShortcutModal';
// import DownloadModal from './../Model/DownloadModal';
// import AddCollaborator from '../Model/AddCollaborator';
// import RatingModal from './../Model/RatingModal';
// import PropTypes from 'prop-types';

// const MainContent = ({transcriptionId }) => {
//   const [activeModal, setActiveModal] = useState(null);
//   const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
//   const [rating, setRating] = useState(0); // Track the current rating
//   const [playing, setPlaying] = useState(false); // Add the playing state
//   const openModal = (modalName) => setActiveModal(modalName);
//   const closeModal = () => setActiveModal(null);

 
//   const showTooltip = (e, text) => {
//     const iconRect = e.target.getBoundingClientRect();
//     setTooltip({
//       visible: true,
//       text,
//       x: iconRect.left + iconRect.width / 2,
//       y: iconRect.top - 10,
//     });
//   };

//   // Function to hide tooltip
//   const hideTooltip = () => setTooltip({ ...tooltip, visible: false });

//   return (
//     <div className="flex flex-col w-3/4 bg-gray-50 p-6 relative">
//       {/* Toolbar Section */}
//       <div className="flex items-center justify-between bg-light-crim p-3 rounded-lg shadow-md mb-4">
//         <div className="flex space-x-3">
//           <button
//             onClick={() => openModal('download')}
//             onMouseEnter={(e) => showTooltip(e, 'Download Transcript')}
//             onMouseLeave={hideTooltip}
//             className="p-2 hover:bg-black hover:text-textcolor rounded-full"
//           >
//             <FaSave />
//           </button>
//           <button
//             onClick={() => openModal('keyboardShortcut')}
//             onMouseEnter={(e) => showTooltip(e, 'Keyboard Shortcuts')}
//             onMouseLeave={hideTooltip}
//             className="p-2 hover:bg-black hover:text-textcolor rounded-full"
//           >
//             <FaKeyboard />
//           </button>
//           <button
//             onClick={() => openModal('spellingGrammar')}
//             onMouseEnter={(e) => showTooltip(e, 'Spelling & Grammar')}
//             onMouseLeave={hideTooltip}
//             className="p-2 hover:bg-black hover:text-textcolor rounded-full"
//           >
//             <FaFont />
//           </button>
//           <button
//             onClick={() => openModal('findReplace')}
//             onMouseEnter={(e) => showTooltip(e, 'Find & Replace')}
//             onMouseLeave={hideTooltip}
//             className="p-2 hover:bg-black hover:text-textcolor rounded-full"
//           >
//             <FaSearch />
//           </button>
//           <button
//             onMouseEnter={(e) => showTooltip(e, 'Undo')}
//             onMouseLeave={hideTooltip}
//             className="p-2 hover:bg-black hover:text-textcolor rounded-full"
//           >
//             <FaUndo />
//           </button>
//           <button
//             onMouseEnter={(e) => showTooltip(e, 'Redo')}
//             onMouseLeave={hideTooltip}
//             className="p-2 hover:bg-black hover:text-textcolor rounded-full"
//           >
//             <FaRedo />
//           </button>
//         </div>

//         {/* Right Side: Add Collaborator, Download, Rating with Stars */}
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={() => openModal('AddCollaborator')}
//             onMouseEnter={(e) => showTooltip(e, 'Add Collaborator')}
//             onMouseLeave={hideTooltip}
//             className="hover:bg-black hover:text-textcolor px-3 py-2 rounded-full"
//           >
//             Add Collaborator
//           </button>
//           <button
//             onClick={() => openModal('Download')}
//             onMouseEnter={(e) => showTooltip(e, 'Download')}
//             onMouseLeave={hideTooltip}
//             className="hover:bg-black hover:text-textcolor px-3 py-2 rounded-full"
//           >
//             Download
//           </button>
//           <div className="flex items-center space-x-1  px-3 py-2 rounded-full">
          
//               <div className="flex items-center space-x-1 hover:bg-black hover:text-textcolor px-3 py-2 rounded-full">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               onClick={() => {
//                 setRating(star);
//                 openModal('rating');
//               }}
//               onMouseEnter={(e) => showTooltip(e, `Give Rating: ${star} Star${star > 1 ? 's' : ''}`)}
//               onMouseLeave={hideTooltip}
//               className={`cursor-pointer text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
//             >
//               ★
//             </button>
//           ))}
//         </div>
//           </div>
//         </div>
//       </div>

//       {/* Transcript Content */}
//       {/* <Transcript /> */}
//       {transcriptionId ? <Transcript transcriptionId={transcriptionId} playing={playing}/> : <p>No Transcript Available</p>}
//       {/* <Transcript transcriptionId={transcriptionId} playing={playing} /> */}
//       {/* Tooltip */}
//       {tooltip.visible && (
//         <div
//           className="absolute bg-black text-textcolor text-xs px-2 py-1 rounded-full"
//           style={{
//             top: tooltip.y,
//             left: tooltip.x,
//             transform: 'translateX(-50%)',
//             whiteSpace: 'nowrap',
//           }}
//         >
//           {tooltip.text}
//         </div>
//       )}

//       {/* Modals */}
//       {activeModal === 'download' && <DownloadModal onClose={closeModal} />}
//       {activeModal === 'keyboardShortcut' && <KeyboardShortcutModal onClose={closeModal} />}
//       {activeModal === 'spellingGrammar' && <SpellingGrammarModal onClose={closeModal} />}
//       {activeModal === 'findReplace' && <FindReplaceModal onClose={closeModal} />}
//       {activeModal === 'AddCollaborator' && <AddCollaborator onClose={closeModal} />}
//       {activeModal === 'Download' && <DownloadModal onClose={closeModal} />}
//       {activeModal === 'rating' && <RatingModal onClose={closeModal} rating={rating} setRating={setRating} />}
//     </div>
//   );
// };
// MainContent.propTypes = {
//   transcriptionId: PropTypes.string, // Add prop type validation for transcriptionId
// };


// export default MainContent;



















import React, { useState } from 'react';
import { FaUndo, FaRedo, FaFont, FaSearch, FaKeyboard, FaSave } from 'react-icons/fa';
import Transcript from './Transcript';

import FindReplaceModal from './../Model/FindReplaceModal';
import SpellingGrammarModal from './../Model/SpellingGrammarModal';
import KeyboardShortcutModal from './../Model/KeyboardShortcutModal';
import DownloadModal from './../Model/DownloadModal';
import AddCollaborator from '../Model/AddCollaborator';
import RatingModal from './../Model/RatingModal';
// import PropTypes from 'prop-types';

const MainContent = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [rating, setRating] = useState(0); // Track the current rating
  const [playing, setPlaying] = useState(false); // Add the playing state
  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  const showTooltip = (e, text) => {
    const iconRect = e.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      text,
      x: iconRect.left + iconRect.width / 2,
      y: iconRect.top - 10,
    });
  };

  // Function to hide tooltip
  const hideTooltip = () => setTooltip({ ...tooltip, visible: false });

  return (
    <div className="flex flex-col w-3/4 bg-gray-50 p-6 relative">
      {/* Toolbar Section */}
      <div className="flex items-center justify-between bg-light-crim p-3 rounded-lg shadow-md mb-4">
        <div className="flex space-x-3">
          <button
            onClick={() => openModal('download')}
            onMouseEnter={(e) => showTooltip(e, 'Download Transcript')}
            onMouseLeave={hideTooltip}
            className="p-2 hover:bg-black hover:text-textcolor rounded-full"
          >
            <FaSave />
          </button>
          <button
            onClick={() => openModal('keyboardShortcut')}
            onMouseEnter={(e) => showTooltip(e, 'Keyboard Shortcuts')}
            onMouseLeave={hideTooltip}
            className="p-2 hover:bg-black hover:text-textcolor rounded-full"
          >
            <FaKeyboard />
          </button>
          <button
            onClick={() => openModal('spellingGrammar')}
            onMouseEnter={(e) => showTooltip(e, 'Spelling & Grammar')}
            onMouseLeave={hideTooltip}
            className="p-2 hover:bg-black hover:text-textcolor rounded-full"
          >
            <FaFont />
          </button>
          <button
            onClick={() => openModal('findReplace')}
            onMouseEnter={(e) => showTooltip(e, 'Find & Replace')}
            onMouseLeave={hideTooltip}
            className="p-2 hover:bg-black hover:text-textcolor rounded-full"
          >
            <FaSearch />
          </button>
          <button
            onMouseEnter={(e) => showTooltip(e, 'Undo')}
            onMouseLeave={hideTooltip}
            className="p-2 hover:bg-black hover:text-textcolor rounded-full"
          >
            <FaUndo />
          </button>
          <button
            onMouseEnter={(e) => showTooltip(e, 'Redo')}
            onMouseLeave={hideTooltip}
            className="p-2 hover:bg-black hover:text-textcolor rounded-full"
          >
            <FaRedo />
          </button>
        </div>

        {/* Right Side: Add Collaborator, Download, Rating with Stars */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => openModal('AddCollaborator')}
            onMouseEnter={(e) => showTooltip(e, 'Add Collaborator')}
            onMouseLeave={hideTooltip}
            className="hover:bg-black hover:text-textcolor px-3 py-2 rounded-full"
          >
            Add Collaborator
          </button>
          <button
            onClick={() => openModal('Download')}
            onMouseEnter={(e) => showTooltip(e, 'Download')}
            onMouseLeave={hideTooltip}
            className="hover:bg-black hover:text-textcolor px-3 py-2 rounded-full"
          >
            Download
          </button>
          <div className="flex items-center space-x-1  px-3 py-2 rounded-full">
            <div className="flex items-center space-x-1 hover:bg-black hover:text-textcolor px-3 py-2 rounded-full">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setRating(star);
                    openModal('rating');
                  }}
                  onMouseEnter={(e) => showTooltip(e, `Give Rating: ${star} Star${star > 1 ? 's' : ''}`)}
                  onMouseLeave={hideTooltip}
                  className={`cursor-pointer text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Content */}
      <Transcript playing={playing} />

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute bg-black text-textcolor text-xs px-2 py-1 rounded-full"
          style={{
            top: tooltip.y,
            left: tooltip.x,
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Modals */}
      {activeModal === 'download' && <DownloadModal onClose={closeModal} />}
      {activeModal === 'keyboardShortcut' && <KeyboardShortcutModal onClose={closeModal} />}
      {activeModal === 'spellingGrammar' && <SpellingGrammarModal onClose={closeModal} />}
      {activeModal === 'findReplace' && <FindReplaceModal onClose={closeModal} />}
      {activeModal === 'AddCollaborator' && <AddCollaborator onClose={closeModal} />}
      {activeModal === 'Download' && <DownloadModal onClose={closeModal} />}
      {activeModal === 'rating' && <RatingModal onClose={closeModal} rating={rating} setRating={setRating} />}
    </div>
  );
};

export default MainContent;



