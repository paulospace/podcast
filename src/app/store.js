import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { podcastStoreReducer } from "../features/podcastStore/podcastStoreSlice";

const rootReducer = combineReducers({
  podcastStore: podcastStoreReducer,
});

/* create a persist store so that the state is stored in a indexeddb*/

export const store = configureStore({
  reducer: rootReducer,
});
