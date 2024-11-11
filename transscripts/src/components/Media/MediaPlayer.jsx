// import React, { useRef, useState } from 'react';
// import { FaPlay, FaPause, FaRedo, FaForward, FaVolumeUp, FaDownload, FaVideo, FaUpload, FaUndo } from 'react-icons/fa';
// import { IoArrowBack } from "react-icons/io5";
import audio from '../../assets/icons/Audio.png';
import audiopink from '../../assets/icons/Audiopink.png';
import audiogreen from '../../assets/icons/Audiogreen.png';
// import axios from 'axios'; // Import axios to make HTTP requests
// import PropTypes from 'prop-types';

// const MediaPlayer = ({ setTranscriptionId,setPlaying  }) => {
//   const mediaRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [mediaSrc, setMediaSrc] = useState('');
//   const [isVideo, setIsVideo] = useState(false);

//   // const togglePlayPause = () => {
//   //   if (isPlaying) {
//   //     mediaRef.current.pause();
//   //   } else {
//   //     mediaRef.current.play();
//   //   }
//   //   setIsPlaying(!isPlaying);
//   // };

//   // const togglePlayPause = () => {
//   //   if (isPlaying) {
//   //     mediaRef.current.pause();
//   //     setPlaying(false); // Stop displaying the transcript
//   //   } else {
//   //     mediaRef.current.play();
//   //     setPlaying(true); // Start displaying the transcript
//   //   }
//   //   setIsPlaying(!isPlaying);
//   // };
//   const togglePlayPause = () => {
//     if (isPlaying) {
//       mediaRef.current.pause();
//       setPlaying(false);
//     } else {
//       mediaRef.current.play();
//       setPlaying(true);
//     }
//     setIsPlaying(!isPlaying);
//   };
  

//   const handleTimeUpdate = () => {
//     setCurrentTime(mediaRef.current.currentTime);
//   };

//   const handleLoadedMetadata = () => {
//     setDuration(mediaRef.current.duration);
//   };

//   const handleProgressChange = (e) => {
//     const newTime = (e.target.value / 100) * duration;
//     mediaRef.current.currentTime = newTime;
//     setCurrentTime(newTime);
//   };

//   const changePlaybackRate = () => {
//     const newRate = playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
//     setPlaybackRate(newRate);
//     mediaRef.current.playbackRate = newRate;
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60).toString().padStart(2, '0');
//     return `${minutes}:${seconds}`;
//   };

//   // const handleMediaUpload = (event) => {
//   //   const file = event.target.files[0];
//   //   if (file) {
//   //     const mediaURL = URL.createObjectURL(file);
//   //     setMediaSrc(mediaURL);
//   //     setIsVideo(file.type.startsWith('video'));
//   //     setIsPlaying(false);
//   //     setCurrentTime(0);
//   //   }
//   // };

//   // src/components/MediaPlayer.jsx
// // Call `props.setTranscriptionId(response.data.transcriptionId);` after successful upload

// const handleMediaUpload = async (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     const mediaURL = URL.createObjectURL(file);
//     setMediaSrc(mediaURL);
//     setIsVideo(file.type.startsWith('video'));
//     setIsPlaying(false);
//     setCurrentTime(0);

//     // Upload the file to obtain transcription ID
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5000/api/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       setTranscriptionId(response.data.transcriptionId); // Set transcription ID
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   }
// };




//   // Function to handle media download using FFmpeg
//   const handleDownload = async () => {
//     try {
//         const response = await fetch(mediaSrc);
//         const blob = await response.blob();

//         const formData = new FormData();
//         formData.append('file', blob, 'media.mp4');

//         const downloadResponse = await axios.post('http://localhost:5000/api/upload', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             },
//             responseType: 'blob'
//         });

//         const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'downloaded_media.mp4');
//         document.body.appendChild(link);
//         link.click();
//         link.parentNode.removeChild(link);
//     } catch (error) {
//         console.error("Download failed: ", error);
//     }
// };



 

//   return (
//     <div className="bg-black text-white rounded-lg p-6 mb-4 w-full max-w-md mx-auto">
//       <div className="flex items-center mb-4">
//         <button className="text-neon-yellow text-2xl rounded-full p-1 mr-2 border border-white">
//           <IoArrowBack />
//         </button>
//         <h1 className="text-lg font-semibold">8.3.24 Design Meeting Notes</h1>
//       </div>

//       {/* Display Video or Audio Tracks with Waveform Icons */}
//       <div className="bg-pinkish rounded-lg py-6 px-4 space-y-4 mb-4">
//         {isVideo ? (
//           <video
//             ref={mediaRef}
//             src={mediaSrc}
//             onTimeUpdate={handleTimeUpdate}
//             onLoadedMetadata={handleLoadedMetadata}
//             controls
//             className="w-full rounded-lg"
//           />
//         ) : (
//           <>
//             <div className="bg-primary-black h-12 rounded-lg flex items-center justify-center">
//               <img src={audio} alt="Audio Track 1" className="h-6" />
//             </div>
//             <div className="bg-primary-black h-12 rounded-lg flex items-center justify-center">
//               <img src={audiopink} alt="Audio Track 2" className="h-6" />
//             </div>
//             <div className="bg-primary-black h-12 rounded-lg flex items-center justify-center">
//               <img src={audiogreen} alt="Audio Track 3" className="h-6" />
//             </div>
//           </>
//         )}
//       </div>

//       {/* Combined Playback Progress Bar and Controls */}
//       <div className="bg-light-crim rounded-lg py-3 px-4 flex flex-col items-center text-primary-black">
//         <div className="relative bg-light-crim rounded-full h-2 w-full mb-4">
//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={(currentTime / duration) * 100 || 0}
//             onChange={handleProgressChange}
//             className="absolute inset-0 w-full h-2 bg-transparent appearance-none cursor-pointer"
//             style={{
//               background: `linear-gradient(to right, #00C3FF ${(currentTime / duration) * 100}%, #D1D5DB ${(currentTime / duration) * 100}%)`,
//             }}
//           />
//         </div>

//         <div className="flex justify-between items-center w-full">
//           <span className="text-xs font-semibold">{formatTime(currentTime)}</span>

//           <div className="flex items-center space-x-4 justify-center">
//             <button onClick={togglePlayPause} className="w-6 h-6 hover:bg-black hover:text-textcolor rounded-full justify-center flex items-center">
//               {isPlaying ? <FaPause /> : <FaPlay />}
//             </button>
//             <button onClick={() => (mediaRef.current.currentTime -= 10)} className="w-6 h-6 hover:bg-black hover:text-textcolor rounded-full justify-center flex items-center">
//               <FaRedo />
//             </button>
//             <button onClick={() => (mediaRef.current.currentTime += 10)} className="w-6 h-6 hover:bg-black hover:text-textcolor rounded-full justify-center flex items-center">
//               <FaUndo />
//             </button>
//             <button className="w-6 h-6 hover:bg-black hover:text-textcolor rounded-full justify-center flex items-center">
//               <FaVolumeUp />
//             </button>
//             <button onClick={changePlaybackRate} className="w-6 h-6 hover:bg-black hover:text-textcolor rounded-full justify-center flex items-center">
//               {playbackRate}x
//             </button>
//             <button onClick={handleDownload} className="w-6 h-6 hover:bg-black hover:text-textcolor rounded-full justify-center flex items-center">
//               <FaDownload />
//             </button>
//             <label className="w-6 h-6 hover:bg-black hover:text-textcolor rounded-full cursor-pointer flex items-center justify-center">
//               <FaUpload />
//               <input
//                 type="file"
//                 accept="audio/*,video/*"
//                 className="hidden"
//                 onChange={handleMediaUpload}
//               />
//             </label>
//           </div>
//           <span className="text-xs font-semibold">{formatTime(duration)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };
// MediaPlayer.propTypes = {
//   setTranscriptionId: PropTypes.func.isRequired,
//   setPlaying: PropTypes.func.isRequired,
// };
// export default MediaPlayer;







import React, { useRef, useState } from 'react';
import { FaPlay, FaPause, FaRedo, FaUndo, FaVolumeUp, FaDownload, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import PropTypes from 'prop-types';

const MediaPlayer = ({ onTranscriptionReady }) => {
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [mediaSrc, setMediaSrc] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [isAudio, setIsAudio] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      mediaRef.current.pause();
    } else {
      mediaRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(mediaRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(mediaRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    mediaRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const changePlaybackRate = () => {
    const newRate = playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
    setPlaybackRate(newRate);
    mediaRef.current.playbackRate = newRate;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleMediaUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const mediaURL = URL.createObjectURL(file);
      setMediaSrc(mediaURL);
      setIsVideo(file.type.startsWith('video'));
      setIsAudio(file.type.startsWith('audio'));
      setIsPlaying(false);
      setCurrentTime(0);

      const formData = new FormData();
      formData.append("video", file); // Assuming backend expects "video" key for both audio/video
      try {
        const response = await axios.post("http://localhost:3000/upload", formData);
        const transcriptionId = response.data.jobTitle;
        onTranscriptionReady(transcriptionId); // Send transcriptionId to MainContent
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleDownload = () => {
    if (!mediaSrc) return;

    const link = document.createElement('a');
    link.href = mediaSrc;
    link.download = isVideo ? 'video.mp4' : 'audio.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-black text-white rounded-lg p-6 mb-4 w-full max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <button className="text-neon-yellow text-2xl rounded-full p-1 mr-2 border border-white">
          <FaUpload />
        </button>
        <h1 className="text-lg font-semibold">8.3.24 Design Meeting Notes</h1>
      </div>

      <div className="bg-pinkish rounded-lg py-6 px-4 space-y-4 mb-4">
        {isVideo ? (
          <video
            ref={mediaRef}
            src={mediaSrc}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            controls
            className="w-full rounded-lg"
          />
        ) : isAudio ? (
          <audio
            ref={mediaRef}
            src={mediaSrc}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            controls
            className="w-full"
          />
        ) : (
          <>
             <div className="bg-primary-black h-12 rounded-lg flex items-center justify-center">
               <img src={audio} alt="Audio Track 1" className="h-6" />
            </div>
             <div className="bg-primary-black h-12 rounded-lg flex items-center justify-center">
               <img src={audiopink} alt="Audio Track 2" className="h-6" />
             </div>
             <div className="bg-primary-black h-12 rounded-lg flex items-center justify-center">
               <img src={audiogreen} alt="Audio Track 3" className="h-6" />
            </div>
           </>
        )}
      </div>

      <div className="bg-light-crim rounded-lg py-3 px-4 flex flex-col items-center text-primary-black">
        <div className="relative bg-light-crim rounded-full h-2 w-full mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleProgressChange}
            className="absolute inset-0 w-full h-2 bg-transparent appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #00C3FF ${(currentTime / duration) * 100}%, #D1D5DB ${(currentTime / duration) * 100}%)`,
            }}
          />
        </div>

        <div className="flex justify-between items-center w-full">
          <span className="text-xs md:text-sm font-semibold">{formatTime(currentTime)}</span>
          
          <div className="flex items-center justify-center space-x-4 sm:space-x-2 flex-wrap gap-y-2">
            <button 
              onClick={togglePlayPause} 
              className="w-6 h-6 md:w-8 md:h-8 hover:bg-black hover:text-textcolor rounded-full flex items-center justify-center"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button 
              onClick={() => (mediaRef.current.currentTime -= 10)} 
              className="w-6 h-6 md:w-8 md:h-8 hover:bg-black hover:text-textcolor rounded-full flex items-center justify-center"
            >
              <FaUndo />
            </button>
            <button 
              onClick={() => (mediaRef.current.currentTime += 10)} 
              className="w-6 h-6 md:w-8 md:h-8 hover:bg-black hover:text-textcolor rounded-full flex items-center justify-center"
            >
              <FaRedo />
            </button>
            <button 
              className="w-6 h-6 md:w-8 md:h-8 hover:bg-black hover:text-textcolor rounded-full flex items-center justify-center"
            >
              <FaVolumeUp />
            </button>
            <button 
              onClick={changePlaybackRate} 
              className="w-6 h-6 md:w-8 md:h-8 hover:bg-black hover:text-textcolor rounded-full flex items-center justify-center"
            >
              {playbackRate}x
            </button>
            <button 
              onClick={handleDownload} 
              className="w-6 h-6 md:w-8 md:h-8 hover:bg-black hover:text-textcolor rounded-full flex items-center justify-center"
            >
              <FaDownload />
            </button>
            <label 
              className="w-6 h-6 md:w-8 md:h-8 hover:bg-black hover:text-textcolor rounded-full cursor-pointer flex items-center justify-center"
            >
              <FaUpload />
              <input
                type="file"
                accept=".mp3, .mp4"
                className="hidden"
                onChange={handleMediaUpload}
              />
            </label>
          </div>

          <span className="text-xs md:text-sm font-semibold">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

MediaPlayer.propTypes = {
  onTranscriptionReady: PropTypes.func.isRequired,
};

export default MediaPlayer;















