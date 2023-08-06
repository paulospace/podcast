import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import {
  getPodcastFeedRSS,
  selectSinglePodcastFeedFromStore,
  selectSinglePodcastFeedStatus,
} from "./podcastStoreSlice";
import PodcastFeed from "../../components/PodcastFeed/Podcastfeed";

export const SinglePodcastFeed = () => {
  const { podcastUrl } = useLoaderData();
  const hasValidURL = podcastUrl ? true : false;

  const dispatch = useDispatch();
  let podcastFeed = useSelector(selectSinglePodcastFeedFromStore);
  let status = useSelector(selectSinglePodcastFeedStatus);
  console.log(podcastFeed);
  useEffect(
    () => {
      if (status === "idle") {
        dispatch(getPodcastFeedRSS(podcastUrl));
      }
    },
    /* eslint-disable */ [podcastUrl, dispatch]
  );

  let content;

  if (!hasValidURL) {
    content = <div className="error">No Podcast Feed URL</div>;
  } else if (status === "error") {
    content = <div className="error">Could not retrieve podcast Feed</div>;
  } else if (status === "peding") {
    content = <div className="loading">Loading...</div>;
  } else if (status === "success") {
    if (podcastFeed) content = <PodcastFeed podcast={podcastFeed} />;
  }

  return <>{content}</>;
};
