// 
// Video detail
// 

// dependencies
// --------------
import React from 'react'; // react

// Video detail (ES56 - functional component)
const VideoDetail = ({video}) => {
    console.log('rendering video...');
    
    // no video is passed yet (component renders without having data)
    if(!video) {
        return <div>Loading...</div>;
    }

    const   videoId = video.id.videoId,
            // url = 'https://www.youtobe.com/embed/' + videoId;
            url = `https://www.youtube.com/embed/${videoId}`; // ES6 'back tick' syntax

    console.log('videoId => ', video.id.videoId);

    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe 
                    className="embed-responsive-item"
                    src={ url }
                >
                </iframe>
            </div>
            <div className="details">
                <div>{ video.snippet.title }</div>
                <div>{ video.snippet.description }</div>
            </div>
        </div>
    );
};

export default VideoDetail; // ES6 exports the component