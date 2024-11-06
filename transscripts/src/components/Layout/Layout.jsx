
// import React from 'react';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import MainContent from './MainContent';

// const Layout = () => {
//   return (
//     <div className="flex flex-col h-screen bg-light-crim">
//       <Navbar />
//       <div className="flex flex-grow gap-2">
      
//         <Sidebar />
//         <MainContent />
//       </div>
//     </div>
//   );
// };

// export default Layout;





// src/components/Layout2/Layout2.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Layout2 = () => {
  const [transcriptionId, setTranscriptionId] = useState(null);
  const [playing, setPlaying] = useState(false); // add `playing` state

  return (
    <div className="flex flex-col h-screen bg-light-crim">
      <Navbar />
      <div className="flex flex-grow gap-2">
        {/* <Sidebar setTranscriptionId={setTranscriptionId} />
        <MainContent transcriptionId={transcriptionId} /> */}
        <Sidebar setTranscriptionId={setTranscriptionId} setPlaying={setPlaying} />
        <MainContent transcriptionId={transcriptionId} playing={playing} />
      </div>
    </div>
  );
};

export default Layout2;
