import { useLoaderData } from "react-router-dom";
import { selectPodcastEpisode } from "./podcastLibrarySlice";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import sanitize from "sanitize-html";

const sanitizeConfig = {
  allowedTags: ["p", "div", "img", "a"],
};

export const PodcastLibraryEpisode = () => {
  const { podcastId, episodeId } = useLoaderData();

  const episode = useSelector((state) =>
    selectPodcastEpisode(state, podcastId, episodeId)
  );
  let content;
  console.log(episode, "odsad");
  if (episode) {
    content = (
      <div className="PodcastLibraryEpisode">
        <div className="PodcastLibrary-Episode-header">
          <div className="PodcastLibraryEpisode-header-image">
            <img src={episode.image} />
          </div>
          <div className="PodcastLibraryEpisode-header-title">
            <h2>{episode.title}</h2>
          </div>
          <div className="PodcastLibraryEpisode-header-description">
            {parse(sanitize(episode.description, sanitizeConfig))}
          </div>
        </div>
      </div>
    );
  } else {
    content = <div className="error">Could not find episode</div>;
  }
  return content;
};
