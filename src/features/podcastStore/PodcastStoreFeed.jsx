import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import {
  getPodcastFeedRSS,
  selectSinglePodcastFeedFromStore,
  selectSinglePodcastFeedStatus,
  setPocastFeedStatus,
} from "./podcastStoreSlice";
import PodcastFeed from "../../components/PodcastFeed/Podcastfeed";
import { PodcastEpisode } from "../../components/PodcastEpisode/PodcastEpisode";

export const PodcastStoreFeed = () => {
  const { podcastUrl, ep } = useLoaderData();
  const hasValidURL = podcastUrl ? true : false;

  const dispatch = useDispatch();
  let podcastFeed = useSelector(selectSinglePodcastFeedFromStore);
  let status = useSelector(selectSinglePodcastFeedStatus);
  console.log(podcastFeed);
  useEffect(
    () => {
      if (status === "idle") {
        if (podcastUrl === podcastFeed.url) {
          console.log("1");
          dispatch(setPocastFeedStatus("success"));
        } else dispatch(getPodcastFeedRSS(podcastUrl));
      }
    },
    /* eslint-disable */ [status, podcastUrl, dispatch]
  );

  let content;

  if (!hasValidURL) {
    content = <div className="error">No Podcast Feed URL</div>;
  } else if (status === "error") {
    content = <div className="error">Could not retrieve podcast Feed</div>;
  } else if (status === "pending") {
    content = <div className="loading">Loading...</div>;
  } else if (status === "success") {
    if (ep) content = <PodcastEpisode episode={podcastFeed.episodes[ep]} />;
    else if (podcastFeed) content = <PodcastFeed podcast={podcastFeed} />;
  }

  return <>{content}</>;
};
