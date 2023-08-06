import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLibrary } from "./podcastLibrarySlice";

export const PodcastLibraryPage = () => {
  const libraryArray = Object.entries(useSelector(selectLibrary));

  return (
    <div className="LibraryPage">
      {libraryArray.map(([key, podcast]) => {
        return (
          <Link to={`/library/${key}`} key={key}>
            <div className="PodcastThumbnail">
              <div className="PodcastThumbnail-image">
                <img src={podcast.image.url} />
              </div>
              <div className="PodcastThumbnail-info">
                <div className="PodcastThumbnail-name">{podcast.title}</div>
                <div className="PodcastThumbnail-author">
                  {podcast["itunes:owner"]["itunes:name"]}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
