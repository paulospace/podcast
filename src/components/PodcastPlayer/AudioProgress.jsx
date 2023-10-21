export const AudioProgress = ({
  disabled,
  duration,
  currentProgress,
  buffered,
  onChange,
}) => {
  return (
    <div className="PodcastPlayer-AudioProgress">
      <input
        type="range"
        name="audioProgress"
        disabled={disabled}
        min={0}
        max={duration}
        value={currentProgress}
        onChange={onChange}
      />
    </div>
  );
};
