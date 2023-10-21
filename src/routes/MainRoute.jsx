import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom";
import { PodcastStoreSearch } from "../features/podcastStore/PodcastStoreSearch";

import "./MainRoute.css";
import {
  resetSearchStatus,
  resetSinglePodcastFeedStatus,
  selectCurrentPlaying,
} from "../features/podcastStore/podcastStoreSlice";
import { store } from "../app/store";

import { PodcastStoreFeed } from "../features/podcastStore/PodcastStoreFeed";
import { PodcastPlayer } from "../components/PodcastPlayer/PodcastPlayer";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useSelector } from "react-redux";

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
  const navigate = useNavigate();
  const onSearchSubmit = (query) => {
    navigate(`/search?q=${query}`);
  };
  const currentPlaying = useSelector(selectCurrentPlaying);
  console.log(currentPlaying);
  return (
    <>
      <div className="mainContent">
        <div className="mainContent-container">
          <SearchBar onSearchSubmit={onSearchSubmit} />
          <Outlet />
        </div>
      </div>
      <PodcastPlayer
        audio={currentPlaying ? currentPlaying.content["@_url"] : null}
        episodeUrl={currentPlaying ? currentPlaying.url : null}
        episodeArtWork={currentPlaying ? currentPlaying.image : null}
      />
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
