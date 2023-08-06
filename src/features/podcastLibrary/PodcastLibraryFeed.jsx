import { useLoaderData } from "react-router-dom";
selectPodcast;
import PodcastFeed from "../../components/PodcastFeed/Podcastfeed";
import { useSelector } from "react-redux";
import { selectPodcast } from "./podcastLibrarySlice";

export const PodcastLibraryFeed = () => {
  const { podcastId } = useLoaderData();
  console.log(podcastId);
  const podcast = useSelector((state) => selectPodcast(state, podcastId));

  // TODO: Create Error Page
  let content;
  if (podcast) {
    content = <PodcastFeed podcast={podcast} />;
  } else content = <div className="PodcastNotFound">PodcastNot Found</div>;

  return content;
};
