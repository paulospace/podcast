import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { podcastStoreReducer } from "../features/podcastStore/podcastStoreSlice";

const rootReducer = combineReducers({
  podcastStore: podcastStoreReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
