import { createBrowserRouter, Outlet } from "react-router-dom";
import { PodcastStoreSearch } from "../features/podcastStore/PodcastStoreSearch";

import Navigation from "../components/Navigation/Navigation";
import "./MainRoute.css";
import {
  resetSearchStatus,
  resetSinglePodcastFeedStatus,
} from "../features/podcastStore/podcastStoreSlice";
import { store } from "../app/store";

import { PodcastStoreFeed } from "../features/podcastStore/PodcastStoreFeed";

const searchLoader = (params) => {
  const url = new URL(params.request.url);
  const query = url.searchParams.get("q");
  store.dispatch(resetSearchStatus());
  return { query };
};

const podcastFeedLoader = (params) => {
  const url = new URL(params.request.url);
  const podcastUrl = url.searchParams.get("url");
  const ep = url.searchParams.get("ep");
  store.dispatch(resetSinglePodcastFeedStatus());
  return { podcastUrl, ep };
};

export const MainRoute = () => {
  return (
    <>
      <Navigation />
      <div className="mainContent">
        <Outlet />
      </div>
    </>
  );
};

/* eslint-disable-line */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute />,
    children: [
      {
        path: "/search",
        element: <PodcastStoreSearch />,
        loader: searchLoader,
      },
      {
        path: "/podcast",
        element: <PodcastStoreFeed />,
        loader: podcastFeedLoader,
      },
    ],
  },
]);
