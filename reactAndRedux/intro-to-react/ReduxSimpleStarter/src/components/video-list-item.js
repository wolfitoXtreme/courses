// 
// Video list item
// 

// dependencies
// --------------
import React from 'react';  // react

// Video list item (ES56 - functional component)
// const VideoListItem = (props) => {
const VideoListItem = ({video, onVideoSelect}) => { // grabbing 'video, onVideoSelect'  property 
                                                    // from props directly (ES6 syntax), same as: 
                                                    // const video = props.video;
                                                    // const onVideoSelect = props.onVideoSelect;

    const   imageUrl = video.snippet.thumbnails.default.url,
            title = video.snippet.title;


    // console.log('video is =>', video);
    return (

        /* -------------------
        onClick is an default event function, is treated as custom function
        to send the selected video to video-detail component
        ------------------- */

        <li onClick={() => onVideoSelect(video)} className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                    <img 
                        className="media-object" 
                        src={imageUrl}
                    />
                </div>
                <div className="media-body">
                    <div className="media-heading">{title}</div>
                </div>
            </div>
        </li>
    );
};

export default VideoListItem; // ES6 exports the component