import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  librarySize: 0,
  podcasts: {},
};
const podcastLibrarySlice = createSlice({
  name: "podcastLibrary",
  initialState: initialState,
  reducers: {
    addPodcastToLibrary: (state, action) => {
      console.log(action);
      state.podcasts[uuidv4()] = action.payload;
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
  },
});

export const {
  addPodcastToLibrary,
  removePodcastFromLibrary,
  markEpisodeAsListened,
} = podcastLibrarySlice.actions;
export const podcastLibraryReducer = podcastLibrarySlice.reducer;
