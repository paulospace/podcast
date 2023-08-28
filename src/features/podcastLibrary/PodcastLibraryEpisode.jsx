import { useLoaderData } from "react-router-dom";
import { selectPodcastEpisode } from "./podcastLibrarySlice";
import { useSelector } from "react-redux";
import { PodcastEpisode } from "../../components/PodcastEpisode/PodcastEpisode";

export const PodcastLibraryEpisode = () => {
  const { podcastId, episodeId } = useLoaderData();

  const episode = useSelector((state) =>
    selectPodcastEpisode(state, podcastId, episodeId)
  );
  let content;
  console.log(episode, "odsad");
  if (episode) {
    content = <PodcastEpisode episode={episode} />;
  } else {
    content = <div className="error">Could not find episode</div>;
  }
  return content;
};
