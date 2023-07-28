import { useDispatch } from "react-redux";
import "./PodcastFeed.css";
import { addPodcastToLibrary } from "../../features/podcastLibrary/podcastLibrarySlice";

const PodcastFeed = (props) => {
  const dispatch = useDispatch();
  const subscribeButtonClicked = () => {
    dispatch(addPodcastToLibrary(props.podcast));
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
          <button onClick={subscribeButtonClicked}>Subscribe</button>
        </div>
      </div>
      <div className="PodcastFeed-Episodes">
        {props.podcast.item.map((episode, i) => {
          return (
            <div className="PodcastFeed-Episode" key={i}>
              <h3>{episode.title}</h3>
              <div>{episode.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PodcastFeed;
