import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SearchResults } from '../features/podcastStore/SearchResults';
import Navigation from '../components/Navigation';

const Test = () => {
    return <div>Test</div>
}

export const MainRoute = () => {
    return (
        <Router>
            <Navigation />
            <Switch>
                <Route exact path="/" component={Test} />
                <Route exact path="/search" component={SearchResults} />
            </Switch>
        </Router>
    )
}