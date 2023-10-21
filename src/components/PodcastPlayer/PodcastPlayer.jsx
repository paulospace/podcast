import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { AudioProgress } from "./AudioProgress";

// React Audio Player based on https://jeffsegovia.dev/blogs/building-an-audio-player-with-reactjs

export const PodcastPlayer = ({
  audio,
  audioName,
  episodeUrl,
  episodeArtwork,
}) => {
  const audioRef = useRef();

  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);

  const handleBufferProgress = (e) => {
    const audio = e.currentTarget;
    const dur = audio.duration;

    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (
          audio.buffered.start(audio.buffered.length - 1 - i) <
          audio.currentTime
        ) {
          const bufferedLength = audio.buffered.end(
            audio.buffered.length - 1 - i
          );
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  const toggleIsPlaying = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="PodcastPlayer">
      {audio && (
        <audio
          ref={audioRef}
          preload="metadata"
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onCanPlay={() => setIsReady(true)}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(e) => {
            setCurrentProgress(e.currentTarget.currentTime);
            handleBufferProgress(e);
          }}
          onProgress={handleBufferProgress}
        >
          <source type="audio/mpeg" src={audio} />
        </audio>
      )}
      <div className="PodcastPlayer-ui">
        <div className="PodcastPlayer-ui-image">
          <Link to={episodeUrl}>
            <img src={episodeArtwork} />
          </Link>
        </div>
        <div className="PodcastPlayer-player">
          <button disabled={!isReady} onClick={toggleIsPlaying}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <AudioProgress
            disabled={!isReady}
            duration={duration}
            currentProgress={currentProgress}
            onChange={(e) => {
              if (!audioRef.current) return;

              audioRef.current.currentTime = e.currentTarget.valueAsNumber;

              setCurrentProgress(e.currentTarget.valueAsNumber);
            }}
          />
        </div>
      </div>
    </div>
  );
};
