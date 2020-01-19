// 
// Video item
// 

// dependencies
// --------------

// npm modules
import React from 'react';

//components
import './video-item.css'; // Webpack CSS import syntax, will import styles as embedded

// logic
// --------------

// components
// --------------
const VideoItem = (props) => {
    console.log('video props are =>', props);

    // executing 'onVideoSelection' reference of App 'onVideoSelect'
    const setSelectedVideo = () => {
        // app state selected video will change 
        return props.onVideoSelection(props.video);
    };


    return (
   
        // using arrow function to execute 'onVideoSelection' reference to
        // App 'onVideoSelect' function with an argument
        // ex: onClick={() => props.onVideoSelection(props.video)}

        <div 
            onClick={setSelectedVideo}
            className="item video-item"
        >
            <img 
                src={props.video.snippet.thumbnails.medium.url} 
                alt={props.video.snippet.title}
                className="ui image"
            />
            <div className="content">
                <div className="header">{props.video.snippet.title}</div>
            </div>
        </div>
    );
};

// export
export default VideoItem;