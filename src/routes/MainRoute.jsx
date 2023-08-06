import { createBrowserRouter, Outlet } from "react-router-dom";
import { SearchResults } from "../features/podcastStore/SearchResults";
import { SinglePodcastFeed } from "../features/podcastStore/SinglePodcastFeed";
import Navigation from "../components/Navigation";
import "./MainRoute.css";
import {
  resetSearchStatus,
  resetSinglePodcastFeedStatus,
} from "../features/podcastStore/podcastStoreSlice";
import { store } from "../app/store";
import { PodcastLibraryPage } from "../features/podcastLibrary/PodcastLibraryPage";
import { PodcastLibraryFeed } from "../features/podcastLibrary/PodcastLibraryFeed";

const searchLoader = (params) => {
  const url = new URL(params.request.url);
  const query = url.searchParams.get("q");
  store.dispatch(resetSearchStatus());
  return { query };
};

const podcastFeedLoader = (params) => {
  const url = new URL(params.request.url);
  const podcastUrl = url.searchParams.get("url");
  store.dispatch(resetSinglePodcastFeedStatus());
  return { podcastUrl };
};

const podcastLibraryFeedLoader = (params) => {
  console.log(params);
  return {
    podcastId: params.params.podcastId,
  };
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
        path: "/",
        element: <PodcastLibraryPage />,
      },
      {
        path: "library/:podcastId",
        element: <PodcastLibraryFeed />,
        loader: podcastLibraryFeedLoader,
      },
      {
        path: "/search",
        element: <SearchResults />,
        loader: searchLoader,
      },
      {
        path: "/podcast",
        element: <SinglePodcastFeed />,
        loader: podcastFeedLoader,
      },
    ],
  },
]);
