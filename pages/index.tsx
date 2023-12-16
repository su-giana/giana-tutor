import React from 'react';
import AudioRecorder from '../components/AudioRecorder';

const Home: React.FC = () => {
  const handleAudioSave = (audioBlob: Blob) => {
    // Here, you'll handle the audio blob
    // For example, sending it to the server
  };

  return (
    <div>
      <h1>Audio Recorder</h1>
      <AudioRecorder />
    </div>
  );
};

export default Home;