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
            className="PodcastEpisode-play-button
          "
            onClick={(e) => {
              dispatch(setCurrentPlayngPodcast(episode));
            }}
          >
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
        </div>
      </div>
      <div className="PodcastEpisode-description">
        {parse(sanitize(episode.description, sanitizeConfig))}
      </div>
    </div>
  );
};
