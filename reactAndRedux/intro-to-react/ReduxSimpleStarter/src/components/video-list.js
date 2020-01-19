// 
// Video list
// 

// dependencies
// --------------
import React from 'react';                      // react
import VideoListItem from './video-list-item'; // video list item

// Video list (ES56 - functional component)
const VideoList = (props) => { // props (videos) passed by 'App' component (this.state.videos)
    
    // build videos list
    /* -------------------
    it is recommended to use 'array.map' method for JSX instead of
    using 'for' loops.
    
    when upgrading a functional component as this one, to a class component
    references to 'props' will need to be updated to this.props

    Sending to each video list item
    - onVideoSelect function
    - video key (map iterator need it)
    - video object
    ------------------- */
    const videoItems = props.videos.map((video) => {
        // returning VideoListItem with properties
        return <VideoListItem
                    onVideoSelect=  {props.onVideoSelect}
                    key=            {video.etag}
                    video=          {video}
                />;
    });

    return(
        <ul className="col-md-4 list-group">
        { videoItems }
        </ul>
    );
};

export default VideoList; // ES6 exports the component