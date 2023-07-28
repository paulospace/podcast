import { configureStore } from "@reduxjs/toolkit";
import { podcastStoreReducer } from "../features/podcastStore/podcastStoreSlice";
import { podcastLibraryReducer } from "../features/podcastLibrary/podcastLibrarySlice";

export const store = configureStore({
  reducer: {
    podcastStore: podcastStoreReducer,
    podcastLibrary: podcastLibraryReducer,
  },
});
