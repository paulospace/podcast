import { PodcastThumbnail } from "../components/PodcastThumbnail/PodcastThumbnail";
import "./SearchResultsPage.css";

export const SearchResultsPage = ({ searchResults, query }) => {
  return (
    <div className="SearchResultsPage">
      <h1 className="SearchResultsPage-title">
        Your Search Results for {query}{" "}
      </h1>
      <div className="SearchResultsPage-results">
        {searchResults.map((podcast) => {
          return (
            <PodcastThumbnail
              name={podcast.collectionName}
              artwork={podcast.artworkUrl600}
              feedUrl={podcast.feedUrl}
              artistName={podcast.artistName}
              key={podcast.collectionId}
            />
          );
        })}
      </div>
    </div>
  );
};
