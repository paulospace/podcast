import "./AudioProgress.css";

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
    </div>
  );
};
