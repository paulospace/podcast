import { useDispatch, useSelector } from "react-redux";

import {
  searchItunesForPodcast,
  selectSearchResults,
  selectSearchResultsStatus,
} from "./podcastStoreSlice";
import { useEffect } from "react";
import { PodcastThumbnail } from "../../components/PodcastThumbnail";

import "./SearchResults.css";
import { useLoaderData } from "react-router-dom";

const SearchResults = () => {
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
    content = searchResults.results.map((podcast) => {
      return <PodcastThumbnail podcast={podcast} key={podcast.collectionId} />;
    });
  }

  return <div className="SearchResults">{content}</div>;
};

export { SearchResults };
