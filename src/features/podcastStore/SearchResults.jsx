import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from 'react-router-dom';
import { searchItunesForPodcast, selectSearchResults, selectSearchResultsStatus } from "./podcastStoreSlice";
import { useEffect } from "react";
import { PodcastThumbnail } from "../../components/PodcastThumbnail";

import "./SearchResults.css"

const useQuery = () => {
    const {search} = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search])
}

const SearchResults = () => {
    let query = useQuery();
    query = query.get('q');
    let hasQuery = true;
    if (!query) {
        hasQuery = false;
    }

    const dispatch = useDispatch();
    const status = useSelector(selectSearchResultsStatus);
    const searchResults = useSelector(selectSearchResults);
    
    useEffect(() => {
        if (status === 'idle') {
            dispatch(searchItunesForPodcast(query));
        }
    }, [status, query, dispatch]);

    console.log(searchResults)

    let content;
    if (!hasQuery) {
        content = <div>No Query Specified</div>
    } else if (status === "success") {
        console.log('1')
        content = searchResults.results.map(podcast => {
            return <PodcastThumbnail podcast={podcast} key={podcast.collectionId} />
        });
    }

    return (
        <div className="SearchResults">
            {content}
        </div>
    )
}

export {SearchResults};