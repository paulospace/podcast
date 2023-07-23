import { Router, Switch, Route } from 'react-router-dom';
import { SearchResults } from '../features/podcastStore/SearchResults';
import { SinglePodcastFeed} from '../features/podcastStore/SinglePodcastFeed';
import Navigation from '../components/Navigation';
import { createBrowserHistory } from 'history';
import "./MainRoute.css";
const Test = () => {
    return <div>Test</div>
}
const history = createBrowserHistory();

export const MainRoute = () => {
    return (
        <Router history={history}>
            <Navigation />
            <div className="MainContent">
                <Switch>
                    <Route exact path="/" component={Test} />
                    <Route  path="/search" component={SearchResults} />
                    <Route exact path="/podcast" component={SinglePodcastFeed} />
                </Switch>
            </div>
        </Router>
    )
}