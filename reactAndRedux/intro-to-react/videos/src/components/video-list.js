// 
// Video list
// 

// dependencies
// --------------

// npm modules
import React from 'react';

//components 
import VideoItem from './video-item';   // video item

// logic
// --------------

// components
// --------------
const VideoList = (props) => {  // property key can be extracted directly from 
                                // returning object
                                // ex: const VideoList = ({videos})
    
    // build video list form returning prop.videos
    const returnedVideos = props.videos.map((video) => {
        return (
            // passing key 'etag' as a key for React
            <VideoItem 
                key={video.etag}
                video={video}
                onVideoSelection={props.onVideoSelection}
            />
        );

    });

    return (
        <div className="ui relaxed divided list">
            { returnedVideos }
        </div>
    );
};


// export
export default VideoList;