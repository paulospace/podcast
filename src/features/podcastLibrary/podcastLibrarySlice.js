import { createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";

const state = localforage.getItem("library");
console.log(state);
const initialState = {
  librarySize: 0,
  podcasts: {},
};

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
    marsEpisodeAsNotListened: (state, action) => {
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
