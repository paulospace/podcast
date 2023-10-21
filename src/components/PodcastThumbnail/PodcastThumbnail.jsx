import { Link } from "react-router-dom";

import "./PodcastThumbnail.css";

const PodcastThumbnail = ({ feedUrl, artwork, name, artistName }) => {
  const link = `/podcast?url=${feedUrl}`;

  return (
    <div className="PodcastThumbnail">
      <Link to={link}>
        <div className="PodcastThumbnail-image">
          <img src={artwork} />
        </div>
        <div className="PodcastThumbnail-info">
          <div className="PodcastThumbnail-name">{name}</div>
          <div className="PodcastThumbnail-author">{artistName}</div>
        </div>
      </Link>
    </div>
  );
};

export { PodcastThumbnail };
