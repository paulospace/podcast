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
      state.podcasts[actions.payload.podcastId].item[
        action.payload.episodeId
      ].listened = false;
    },
  },
});

export const selectedPodcastIsSubscribed = (state, id) => {
  return state.podcastLibrary.podcasts[id] ? true : false;
};
export const {
  addPodcastToLibrary,
  removePodcastFromLibrary,
  markEpisodeAsListened,
} = podcastLibrarySlice.actions;

export const setLibraryLocal = (state) => (next) => async (action) => {};
export const podcastLibraryReducer = podcastLibrarySlice.reducer;
