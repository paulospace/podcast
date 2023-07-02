import { useDispatch, useSelector } from "react-redux"
import { getPodcastFeedRSS, selectSinglePodcastFeedFromStore, selectSinglePodcastFeedStatus } from "./podcastStoreSlice";

export const SinglePodcastFeed = ({url}) => {
    const dispatch = useDispatch();
    
    let podcastFeed = useSelector(selectSinglePodcastFeedFromStore);
   

    if (!podcastFeed) {
        dispatch(getPodcastFeedRSS(url));
        
    }

    let content;
    const status = useSelector(selectSinglePodcastFeedStatus);
 
    if (status === 'error') {
        content = (<div className="error">Could not retrieve podcast Feed</div>);
    } else if (status === "peding") {
        content = <div className="loading">Loading...</div>
    } else if (status === 'idle') {
        if (podcastFeed)
         content = <div className="singlePodcastFeed">{podcastFeed.toString()}</div>
    }
    
    return (
        <div className="SinglePodcastFeed">
            {content}
        </div>
    )

    
}