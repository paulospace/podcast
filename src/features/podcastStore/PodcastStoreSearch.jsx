import { useDispatch, useSelector } from "react-redux";
import {
  searchItunesForPodcast,
  selectSearchResults,
  selectSearchResultsStatus,
} from "./podcastStoreSlice";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { SearchResultsPage } from "../../pages/SearchResultsPage";

export const PodcastStoreSearch = () => {
  const { query } = useLoaderData();
  let hasQuery = query ? true : false;

  const dispatch = useDispatch();
  const status = useSelector(selectSearchResultsStatus);
  const searchResults = useSelector(selectSearchResults);

  useEffect(
    () => {
      if (status === "idle") {
        dispatch(searchItunesForPodcast(query));
      }
    },
    /*eslint-disable */ [query, dispatch]
  );

  let content;
  if (!hasQuery) {
    content = <div>No Query Specified</div>;
  } else if (status === "success") {
    content = (
      <SearchResultsPage searchResults={searchResults.results} query={query} />
    );
  }

  return <div className="SearchResults">{content}</div>;
};
