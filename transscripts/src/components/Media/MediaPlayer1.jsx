import React, { useState } from 'react';
// import TranscriptEditor from '@bbc/react-transcript-editor';
import { FaUpload } from 'react-icons/fa';
// import TranscriptEditor from "@bbc/react-transcript-editor";
const TranscriptPlayer = () => {
  const [mediaSrc, setMediaSrc] = useState('');
  const [transcriptData, setTranscriptData] = useState(null);
  
  // Handle file upload
  const handleMediaUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const mediaURL = URL.createObjectURL(file);
      setMediaSrc(mediaURL);
    }
  };

  // Handle transcript download
  const handleDownloadTranscript = () => {
    if (transcriptData) {
      const blob = new Blob([JSON.stringify(transcriptData)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'transcript.json';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="transcript-player">
      <h1 className="text-lg font-semibold">Transcript Player</h1>

      {/* Upload Section */}
      <div className="upload mb-4">
        <label className="cursor-pointer flex items-center space-x-2">
          <FaUpload />
          <input
            type="file"
            accept="audio/*,video/*"
            onChange={handleMediaUpload}
            className="hidden"
          />
          <span>Upload Media</span>
        </label>
      </div>

      {/* BBC Transcript Editor */}
      {mediaSrc && (
        <TranscriptEditor
          mediaUrl={mediaSrc}
          isEditable={true}
          transcriptData={transcriptData}
          handleChangeTranscript={setTranscriptData} // update transcript data on edit
          title="Transcript"
        />
      )}

      {/* Download Transcript Button */}
      {transcriptData && (
        <button onClick={handleDownloadTranscript} className="download-btn mt-4">
          Download Transcript
        </button>
      )}
    </div>
  );
};

export default TranscriptPlayer;
