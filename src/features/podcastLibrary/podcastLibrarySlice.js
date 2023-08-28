import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import localforage from "localforage";
import { fetchPodcastFeedRSS } from "../../app/api";

const state = localforage.getItem("library");
console.log(state);
const initialState = {
  librarySize: 0,
  podcasts: {},
};

export const updatePodcastFeed = createAsyncThunk(
  "podcastLibrary/updatePodcastFeed",
  async (podcastId, { getState }) => {
    const state = getState();
    const podcast = state.podcastLibrary.podcasts[podcastId];

    const updated = fetchPodcastFeedRSS(podcast.url);

    let updatedCount = 0;
    let updatedArray = [];
    for (let i = 0; i < podcast.episodes.length; i++) {
      if (podcast.episodes[i].title === updated.episodes[updatedCount].title) {
        return;
      } else {
        updatedArray.push(updated.episodes[updatedCount]);
        updatedCount++;
      }
    }
  }
);

const podcastLibrarySlice = createSlice({
  name: "podcastLibrary",
  initialState: initialState,
  reducers: {
    addPodcastToLibrary: (state, action) => {
      if (state.podcasts[action.payload.title]) {
        return;
      }

      state.podcasts[action.payload.title] = action.payload;
      state.librarySize++;
    },
    removePodcastFromLibrary: (state, action) => {
      delete state.podcasts[action.payload.podcastId];
      state.librarySize--;
    },
    markEpisodeAsListened: (state, action) => {
      state.podcasts[action.payload.podcastId].item[
        action.payload.episodeId
      ].listened = true;
    },
    markEpisodeAsNotListened: (state, action) => {
      state.podcasts[action.payload.podcastId].item[
        action.payload.episodeId
      ].listened = false;
    },
  },
});

export const selectedPodcastIsSubscribed = (state, id) => {
  return state.podcastLibrary.podcasts[id] ? true : false;
};

export const selectLibrary = (state) => {
  return state.podcastLibrary.podcasts;
};

export const selectPodcast = (state, podcastId) => {
  return state.podcastLibrary.podcasts[podcastId];
};

export const selectPodcastEpisode = (state, podcastId, episodeId) => {
  const podcast = state.podcastLibrary.podcasts[podcastId];
  if (podcast) {
    return podcast.episodes.find((item) => item.id == episodeId);
  }
  return null;
};

export const {
  addPodcastToLibrary,
  removePodcastFromLibrary,
  markEpisodeAsListened,
} = podcastLibrarySlice.actions;

export const podcastLibraryReducer = podcastLibrarySlice.reducer;
