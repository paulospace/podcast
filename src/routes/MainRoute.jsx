import { createBrowserRouter, Outlet } from 'react-router-dom';
import { SearchResults } from '../features/podcastStore/SearchResults';
import { SinglePodcastFeed} from '../features/podcastStore/SinglePodcastFeed';
import Navigation from '../components/Navigation';
import "./MainRoute.css";
import { resetSearchStatus } from '../features/podcastStore/podcastStoreSlice';
import { store } from '../app/store';


const searchLoader = (params) => {
    const url = new URL(params.request.url);
    const query =  url.searchParams.get('q');
    store.dispatch(resetSearchStatus());
    return { query }
}

export const MainRoute = () => {
    return (
        <>
            <Navigation />
            <div className="mainContent">
                < Outlet />
            </div>
        </>
    )
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainRoute />,
        children: [
            {
                path: '/search',
                element: <SearchResults />,
                loader: searchLoader
            },
            {
                path: '/podcast',
                element: <SinglePodcastFeed />
            }
        ]
    }
])

