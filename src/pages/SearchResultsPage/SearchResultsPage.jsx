import { PodcastThumbnail } from "../../components/PodcastThumbnail/PodcastThumbnail";
import "./SearchResultsPage.css";

export const SearchResultsPage = ({ searchResults, query }) => {
  let content;
  if (searchResults == 0) {
    content = <h1>No Results found for {query}</h1>;
  } else {
    content = (
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
  }

  return content;
};
