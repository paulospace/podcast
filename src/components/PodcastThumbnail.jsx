import { Link } from 'react-router-dom'
import './PodcastThumbnail.css';

const PodcastThumbnail = ({podcast}) => {
    const link = `/podcast?url=${podcast.feedUrl}`;

    return (
        <Link to={link}>
            <div className="PodcastThumbnail">
                <div className="PodcastThumbnail-image">
                    <img src={podcast.artworkUrl600} />
                </div>
                <div className="PodcastThumbnail-info">
                    <div className="PodcastThumbnail-name">{podcast.collectionName}</div>
                    <div className="PodcastThumbnail-author">{podcast.artistName}</div>
                </div>
            </div>
        </Link>
    )
}

export {PodcastThumbnail}