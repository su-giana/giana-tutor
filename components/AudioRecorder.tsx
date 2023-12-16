import React, { useCallback, useState, useRef } from 'react';

export function BoxCreate() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const onRecAudio = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      setStream(stream);
      setMedia(mediaRecorder);
      mediaRecorder.start();

      mediaRecorder.ondataavailable = function (e: BlobEvent) {
        const url = URL.createObjectURL(e.data);
        setAudioUrl(url);
      };
    });
  };

  const offRecAudio = () => {
    if (media) {
      media.stop(); // Stops the media recording
      stream?.getAudioTracks().forEach((track) => track.stop()); // Stops the audio tracks
    }
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl; 
      audioRef.current.play(); 
    }
  }, [audioUrl]);

  const downloadAudioFile = useCallback(() => {
    if (audioUrl) {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = audioUrl;
      a.download = 'recorded-audio.mp3';
      a.click();
      a.remove();
    }
  }, [audioUrl]);

  return (
    <div>
      <h1>Audio Recorder</h1>
      <button onClick={onRecAudio}>Start Recording</button>
      <button onClick={offRecAudio}>Stop Recording</button>
      <button onClick={onSubmitAudioFile}>Check Result</button>
      <button onClick={downloadAudioFile}>Download</button>
      <audio ref={audioRef} controls />
    </div>
  );
}

export default BoxCreate;
