import { createSlice } from "@reduxjs/toolkit";

const podcastStoreSlice = createSlice({
    name: 'podcastStore',
    initialState: {
        count: 0
    },
    reducers: {
        addCount(state, action) {
            state.count++;
        }
    }
});

export const {addCount} = podcastStoreSlice.actions
export const podcastStoreReducer = podcastStoreSlice.reducer;