import parse from "html-react-parser";
import sanitize from "sanitize-html";
import "./PodcastFeed.css";

import { Link } from "react-router-dom";

const sanitizeHtmlConfig = {
  allowedTags: [],
  disallowedTagdMode: "discard",
};

const PodcastFeed = ({ image, title, description, episodes }) => {
  console.log(new Date(episodes[0].pubDate));
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
          const pubDate = new Date(episode.pubDate);
          return (
            <div className="PodcastFeed-Episode" key={i}>
              <Link to={episode.url}>
                <div className="PodcastFeed-Episode-date">
                  {pubDate.toLocaleDateString("us-US")}
                </div>
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
