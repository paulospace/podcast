import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import sanitize from "sanitize-html";
import "./PodcastFeed.css";
import {
  addPodcastToLibrary,
  removePodcastFromLibrary,
  selectedPodcastIsSubscribed,
} from "../../features/podcastLibrary/podcastLibrarySlice";

const sanitizeHtmlConfig = {
  allowedTags: [],
  disallowedTagdMode: "discard",
};
const PodcastFeed = (props) => {
  const dispatch = useDispatch();
  const isSubscribed = useSelector((state) =>
    selectedPodcastIsSubscribed(state, props.podcast.title)
  );
  const subscribeButtonClicked = () => {
    if (!isSubscribed) {
      dispatch(addPodcastToLibrary(props.podcast));
    } else {
      const payload = { podcastId: props.podcast.title };
      dispatch(removePodcastFromLibrary(payload));
    }
  };

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
        {props.podcast.item.map((episode, i) => {
          return (
            <div className="PodcastFeed-Episode" key={i}>
              <h3>{episode.title}</h3>
              <div>
                {`${sanitize(episode.description, sanitizeHtmlConfig).slice(
                  0,
                  300
                )}...`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PodcastFeed;
