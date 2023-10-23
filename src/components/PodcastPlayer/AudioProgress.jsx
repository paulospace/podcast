import "./AudioProgress.css";

const formatDurationDisplay = (duration) => {
  const length = Math.floor(duration / 60);
  const hour = Math.floor(length / 60);
  const min = Math.floor(length - hour * 60);
  const sec = Math.floor(duration - length * 60);

  const formatted = [hour, min, sec]
    .map((n) => (n < 10 ? "0" + n : n))
    .join(":");

  return formatted;
};

export const AudioProgress = ({
  disabled,
  duration,
  currentProgress,
  buffered,
  onChange,
}) => {
  const progressBarWidth = isNaN(currentProgress / duration)
    ? 0
    : currentProgress / duration;
  const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

  const progressStyle = {
    "--progress-width": progressBarWidth,
    "--buffered-width": bufferedWidth,
  };
  return (
    <div className="PodcastPlayer-AudioProgress">
      <input
        type="range"
        name="audioProgress"
        disabled={disabled}
        style={progressStyle}
        min={0}
        max={duration}
        value={currentProgress}
        onChange={onChange}
      />
      <div className="PodcastPlayer-AudioProgress-timeElapsed">
        {!disabled
          ? `${formatDurationDisplay(currentProgress)}/
        ${formatDurationDisplay(duration)}`
          : " "}
      </div>
    </div>
  );
};
