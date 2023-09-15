import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import sanitize from "sanitize-html";
import "./PodcastFeed.css";

import { Link } from "react-router-dom";

const sanitizeHtmlConfig = {
  allowedTags: [],
  disallowedTagdMode: "discard",
};
const PodcastFeed = (props) => {
  return (
    <div className="PodcastFeed">
      <div className="PodcastFeed-Header">
        <div className="PodcastFeed-Header-image">
          <img src={props.podcast.image.url} />
        </div>
        <div className="PodcastFeed-Header-info">
          <h2>{props.podcast.title}</h2>
          <div className="PodcastFeed-Header-description">
            {parse(props.podcast.description)}
          </div>
        </div>

        <div className="SubscribeButton">
          <button onClick={subscribeButtonClicked}>
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        </div>
      </div>
      <div className="PodcastFeed-Episodes">
        {props.podcast.episodes.toReversed().map((episode, i) => {
          console.log(episode);
          return (
            <Link to={episode.url} key={i}>
              <div className="PodcastFeed-Episode">
                <h3>{episode.title}</h3>
                <div>
                  {`${sanitize(episode.description, sanitizeHtmlConfig).slice(
                    0,
                    300
                  )}...`}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PodcastFeed;
