import { useDispatch, useSelector } from "react-redux";
import "./PodcastFeed.css";
import {
  addPodcastToLibrary,
  removePodcastFromLibrary,
  selectedPodcastIsSubscribed,
} from "../../features/podcastLibrary/podcastLibrarySlice";

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

  console.log(props);
  return (
    <div className="PodcastFeed">
      <div className="PodcastFeed-Header">
        <div className="PodcastFeed-Header-image">
          <img src={props.podcast.image.url} />
        </div>
        <div className="PodcastFeed-Header-info">
          <h2>{props.podcast.title}</h2>
          <div className="PodcastFeed-Header-description">
            {props.podcast.description}
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
              <div>{episode["itunes:summary"]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PodcastFeed;
