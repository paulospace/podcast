
import './App.css'
import { SinglePodcastFeed } from './features/podcastStore/SinglePodcastFeed';

import { useDispatch } from 'react-redux'
import { searchItunesForPodcast } from './features/podcastStore/podcastStoreSlice';

function App() {
  const dispatch = useDispatch();
  
  const onEnter = (e) => {
    
    if (e.key == 'Enter') 
      dispatch(searchItunesForPodcast(e.target.value));
  }

  return (
    <div className="App">
      
       <SinglePodcastFeed url={'https://www.giantbomb.com/feeds/podcast'} />
    </div>
  )
}

export default App
