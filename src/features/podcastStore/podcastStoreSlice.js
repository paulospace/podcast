import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchItunesSearchPodcast, fetchPodcastFeedRSS } from "../../app/api";



const initialState = {
    singlePodcastFeedRSS: {
        feed: null,
        status: 'idle',
        error: null
    },
    searchResults: {
        results: null,
        status: 'idle',
        error: null
    }
}

export const getPodcastFeedRSS = createAsyncThunk('podcastStore/getPodcastFeedRSS',
    async (feedURL) => {
       
        return await fetchPodcastFeedRSS(feedURL);
});

export const searchItunesForPodcast = createAsyncThunk('podcastStore/searchItunesForPodcast',
    async (query) => {
       return await fetchItunesSearchPodcast(query);
 });


const podcastStoreSlice = createSlice({
    name: 'podcastStore',
    initialState: initialState,
    reducers: {
        
    },
    extraReducers: {
        [getPodcastFeedRSS.pending]: (state) => {
            state.singlePodcastFeedRSS.status = 'pending'
        },
        [getPodcastFeedRSS.fulfilled]: (state, action) => {
            state.singlePodcastFeedRSS.feed = action.payload;
            state.singlePodcastFeedRSS.status = 'success';
        },
        [getPodcastFeedRSS.rejected]: (state, action) => {
            state.singlePodcastFeedRSS.status = "error";
            state.error = action.payload.error;
        },
        [searchItunesForPodcast.pending]: (state) => {
            state.searchResults.status = 'pending';
        },
        [searchItunesForPodcast.fulfilled]: (state, action) => {
            state.searchResults.results = action.payload;
            state.searchResults.status = 'success';
        },
        [searchItunesForPodcast.rejected]: (state, action) => {
            state.searchResults.status = 'error';
            state.searchResults.error = action.payload;
        }
        
    }

});

export const selectSinglePodcastFeedFromStore = (state) => {
    
    return state.podcastStore.singlePodcastFeedRSS.feed;
}

export const selectSinglePodcastFeedStatus = (state) => {
    return state.podcastStore.singlePodcastFeedRSS.status;
}

export const selectSearchResults = (state) => {
    
    
    return state.podcastStore.searchResults.results;
}

export const selectSearchResultsStatus = (state) => {
    return state.podcastStore.searchResults.status;
}



export const podcastStoreReducer = podcastStoreSlice.reducer;