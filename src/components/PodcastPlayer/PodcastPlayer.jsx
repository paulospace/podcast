import { useEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { AudioProgress } from "./AudioProgress";

import "./PodcastPlayer.css";

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

  useEffect(() => {
    audioRef.current?.load();
  }, [audio]);
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

  const rewindSeconds = () => {
    audioRef.current.currentTime = currentProgress - 15;
  };

  const forwardSeconds = () => {
    audioRef.current.currentTime = currentProgress + 15;
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
          <div className="PodcastPlayer-player-controls">
            <button disabled={!isReady} onClick={rewindSeconds}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M29.0057 11.3636V23H26.5455V13.6989H26.4773L23.8125 15.3693V13.1875L26.6932 11.3636H29.0057ZM36.0213 23.1591C35.2183 23.1591 34.5024 23.0114 33.8736 22.7159C33.2486 22.4205 32.7524 22.0133 32.3849 21.4943C32.0175 20.9754 31.8262 20.3807 31.8111 19.7102H34.1974C34.224 20.161 34.4134 20.5265 34.7656 20.8068C35.1179 21.0871 35.5365 21.2273 36.0213 21.2273C36.4077 21.2273 36.7486 21.142 37.044 20.9716C37.3433 20.7973 37.5762 20.5568 37.7429 20.25C37.9134 19.9394 37.9986 19.5833 37.9986 19.1818C37.9986 18.7727 37.9115 18.4129 37.7372 18.1023C37.5668 17.7917 37.33 17.5492 37.027 17.375C36.724 17.2008 36.3774 17.1117 35.9872 17.108C35.6463 17.108 35.3149 17.178 34.9929 17.3182C34.6747 17.4583 34.4266 17.6496 34.2486 17.892L32.0611 17.5L32.6122 11.3636H39.7259V13.375H34.6406L34.3395 16.2898H34.4077C34.6122 16.0019 34.9209 15.7633 35.3338 15.5739C35.7467 15.3845 36.2088 15.2898 36.7202 15.2898C37.4209 15.2898 38.0459 15.4545 38.5952 15.7841C39.1444 16.1136 39.5781 16.5663 39.8963 17.142C40.2145 17.714 40.3717 18.3731 40.3679 19.1193C40.3717 19.9034 40.1899 20.6004 39.8224 21.2102C39.4588 21.8163 38.9493 22.2936 38.294 22.642C37.6425 22.9867 36.8849 23.1591 36.0213 23.1591Z" />
                <path
                  d="M16.9853 40.6525L7.43934 31.1066C6.85355 30.5208 6.85355 29.5711 7.43934 28.9853L16.9853 19.4393C17.5711 18.8536 18.5208 18.8536 19.1066 19.4393C19.6924 20.0251 19.6924 20.9749 19.1066 21.5607L12.1213 28.5459H44.5C51.2124 29.0566 56.5 35.1648 56.5 42.008C56.5 48.8513 51.2124 54.4595 44.5 54.9701V55.0459H10.0018C9.17239 55.0459 8.5 54.3736 8.5 53.5441V53.5441C8.5 52.7161 9.17017 52.0443 9.99817 52.0423L44.5 51.9587C49.5533 51.4569 53.5 47.1934 53.5 42.008C53.5 36.8227 49.5533 32.0477 44.5 31.5459H12.1213L19.1066 38.5312C19.6924 39.117 19.6924 40.0668 19.1066 40.6525C18.5208 41.2383 17.5711 41.2383 16.9853 40.6525Z"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button disabled={!isReady} onClick={toggleIsPlaying}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1_2)">
                  <path d="M56.5 30.4019C58.5 31.5566 58.5 34.4434 56.5 35.5981L9.99999 62.4449C7.99999 63.5996 5.5 62.1562 5.5 59.8468L5.5 6.1532C5.5 3.8438 8 2.40043 10 3.55514L56.5 30.4019Z" />
                </g>
              </svg>
            </button>
            <button disabled={!isReady} onClick={forwardSeconds}>
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M29.0057 11.3636V23H26.5455V13.6989H26.4773L23.8125 15.3693V13.1875L26.6932 11.3636H29.0057ZM36.0213 23.1591C35.2183 23.1591 34.5024 23.0114 33.8736 22.7159C33.2486 22.4205 32.7524 22.0133 32.3849 21.4943C32.0175 20.9754 31.8262 20.3807 31.8111 19.7102H34.1974C34.224 20.161 34.4134 20.5265 34.7656 20.8068C35.1179 21.0871 35.5365 21.2273 36.0213 21.2273C36.4077 21.2273 36.7486 21.142 37.044 20.9716C37.3433 20.7973 37.5762 20.5568 37.7429 20.25C37.9134 19.9394 37.9986 19.5833 37.9986 19.1818C37.9986 18.7727 37.9115 18.4129 37.7372 18.1023C37.5668 17.7917 37.33 17.5492 37.027 17.375C36.724 17.2008 36.3774 17.1117 35.9872 17.108C35.6463 17.108 35.3149 17.178 34.9929 17.3182C34.6747 17.4583 34.4266 17.6496 34.2486 17.892L32.0611 17.5L32.6122 11.3636H39.7259V13.375H34.6406L34.3395 16.2898H34.4077C34.6122 16.0019 34.9209 15.7633 35.3338 15.5739C35.7467 15.3845 36.2088 15.2898 36.7202 15.2898C37.4209 15.2898 38.0459 15.4545 38.5952 15.7841C39.1444 16.1136 39.5781 16.5663 39.8963 17.142C40.2145 17.714 40.3717 18.3731 40.3679 19.1193C40.3717 19.9034 40.1899 20.6004 39.8224 21.2102C39.4588 21.8163 38.9493 22.2936 38.294 22.642C37.6425 22.9867 36.8849 23.1591 36.0213 23.1591Z" />
                <path
                  d="M46.5147 44.6525L56.0607 35.1066C56.6464 34.5208 56.6464 33.5711 56.0607 32.9853L46.5147 23.4393C45.9289 22.8536 44.9792 22.8536 44.3934 23.4393C43.8076 24.0251 43.8076 24.9749 44.3934 25.5607L51.3787 32.5459H19C12.2876 33.0566 7 39.1648 7 46.008C7 52.8513 12.2876 58.4595 19 58.9701V59.0459H53.4982C54.3276 59.0459 55 58.3736 55 57.5441V57.5441C55 56.7161 54.3298 56.0443 53.5018 56.0423L19 55.9587C13.9467 55.4569 10 51.1934 10 46.008C10 40.8227 13.9467 36.0477 19 35.5459H51.3787L44.3934 42.5312C43.8076 43.117 43.8076 44.0668 44.3934 44.6525C44.9792 45.2383 45.9289 45.2383 46.5147 44.6525Z"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
          <AudioProgress
            disabled={!isReady}
            duration={duration}
            currentProgress={currentProgress}
            buffered={buffered}
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
