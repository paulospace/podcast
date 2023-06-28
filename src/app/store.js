import { configureStore } from "@reduxjs/toolkit";
import { podcastStoreReducer } from "../features/podcastStore/podcastStoreSlice";

export const store = configureStore({
    reducer: {
        podcastStore: podcastStoreReducer
    }
});