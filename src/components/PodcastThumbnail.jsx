import './PodcastThumbnail.css';

const PodcastThumbnail = ({podcast}) => {
   
    return (
        <div className="PodcastThumbnail">
            <div className="PodcastThumbnail-image">
                <img src={podcast.artworkUrl600} />
            </div>
            <div className="PodcastThumbnail-info">
                <div className="PodcastThumbnail-name">{podcast.collectionName}</div>
                <div className="PodcastThumbnail-author">{podcast.artistName}</div>
            </div>
        </div>
    )
}

export {PodcastThumbnail}