import parse from "html-react-parser";
import sanitize from "sanitize-html";

import "./PodcastEpisode.css";
import { setCurrentPlayngPodcast } from "../../features/podcastStore/podcastStoreSlice";
import { useDispatch } from "react-redux";

const sanitizeConfig = {
  allowedTags: ["p", "div", "img", "a"],
};

export const PodcastEpisode = ({ episode }) => {
  const dispatch = useDispatch();
  return (
    <div className="PodcastEpisode">
      <div className="PodcastEpisode-header">
        <div className="PodcastEpisode-header-image">
          <img src={episode.image} />
        </div>
        <div className="PodcastEpisode-header-title">
          <h1>{episode.title}</h1>
          <button
            onClick={(e) => {
              dispatch(setCurrentPlayngPodcast(episode));
            }}
          >
            Play
          </button>
        </div>
      </div>
      <div className="PodcastEpisode-description">
        {parse(sanitize(episode.description, sanitizeConfig))}
      </div>
    </div>
  );
};
