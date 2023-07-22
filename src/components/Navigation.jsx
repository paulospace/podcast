import { useHistory } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    const history = useHistory()
    const onKeyPress = (e) => {
        console.log(e)
        if (e.key == "Enter") {
            history.push(`/search?q=${e.target.value}`);
        }
    }
    return <div className="Navigation">
        <div className="Navigation-Links">
            
        </div>
        <div className="Navigation-search">
            <input type="text" className="Navigation-search-input" onKeyPress={onKeyPress} />
        </div>
    </div>
}

export default Navigation;