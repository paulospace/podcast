import parse from "html-react-parser";
import sanitize from "sanitize-html";

const sanitizeConfig = {
  allowedTags: ["p", "div", "img", "a"],
};

export const PodcastEpisode = (props) => {
  return (
    <div className="PodcastLibraryEpisode">
      <div className="PodcastLibrary-Episode-header">
        <div className="PodcastLibraryEpisode-header-image">
          <img src={props.episode.image} />
        </div>
        <div className="PodcastLibraryEpisode-header-title">
          <h2>{props.episode.title}</h2>
        </div>
        <div className="PodcastLibraryEpisode-header-description">
          {parse(sanitize(props.episode.description, sanitizeConfig))}
        </div>
      </div>
    </div>
  );
};
