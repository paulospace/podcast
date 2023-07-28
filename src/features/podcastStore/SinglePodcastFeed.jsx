import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getPodcastFeedRSS,
  selectSinglePodcastFeedFromStore,
  selectSinglePodcastFeedStatus,
} from "./podcastStoreSlice";
import PodcastFeed from "../../components/PodcastFeed/Podcastfeed";

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const SinglePodcastFeed = () => {
  const podcastURL = useQuery().get("url");
  const hasValidURL = podcastURL ? true : false;

  const dispatch = useDispatch();
  let podcastFeed = useSelector(selectSinglePodcastFeedFromStore);
  let status = useSelector(selectSinglePodcastFeedStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPodcastFeedRSS(podcastURL));
    }
  }, [podcastURL, dispatch]);

  let content;

  if (!hasValidURL) {
    content = <div className="error">No Podcast Feed URL</div>;
  } else if (status === "error") {
    content = <div className="error">Could not retrieve podcast Feed</div>;
  } else if (status === "peding") {
    content = <div className="loading">Loading...</div>;
  } else if (status === "success") {
    if (podcastFeed)
      content = (
        <div className="singlePodcastFeed">
          <PodcastFeed podcast={podcastFeed} />
        </div>
      );
  }

  return <div className="SinglePodcastFeed">{content}</div>;
};
