import parse from "html-react-parser";
import sanitize from "sanitize-html";
import "./PodcastFeed.css";

import { Link } from "react-router-dom";

const sanitizeHtmlConfig = {
  allowedTags: [],
  disallowedTagdMode: "discard",
};
const PodcastFeed = ({ image, title, description, episodes }) => {
  return (
    <div className="PodcastFeed">
      <div className="PodcastFeed-Header">
        <div className="PodcastFeed-Header-image">
          <img src={image} />
        </div>
        <div className="PodcastFeed-Header-info">
          <h1>{title}</h1>
          <div className="PodcastFeed-Header-description">
            {parse(description)}
          </div>
        </div>
      </div>
      <div className="PodcastFeed-Episodes">
        {episodes.toReversed().map((episode, i) => {
          return (
            <div className="PodcastFeed-Episode" key={i}>
              <Link to={episode.url}>
                <h2>{episode.title}</h2>
                <div>
                  {`${sanitize(episode.description, sanitizeHtmlConfig).slice(
                    0,
                    300
                  )}...`}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PodcastFeed;
