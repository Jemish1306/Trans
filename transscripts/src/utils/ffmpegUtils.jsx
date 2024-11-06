// src/utils/ffmpegUtils.js

import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

export const initializeFFmpeg = async () => {
  if (!ffmpeg.isLoaded()) await ffmpeg.load();
};

export const convertVideoToAudio = async (videoFile) => {
  await initializeFFmpeg();
  ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));
  await ffmpeg.run('-i', 'input.mp4', 'output.mp3');
  const data = ffmpeg.FS('readFile', 'output.mp3');
  return new Blob([data.buffer], { type: 'audio/mp3' });
};
