// 
// Video item
// 

// dependencies
// --------------

// npm modules
import React from 'react';

//components

// logic
// --------------

// components`
// --------------
const videoDetail = (props) => {
    if(!props.video) {
        return <div>Loading</div>;
    }

    const videoSrc = 'https://www.youtube.com/embed/' + props.video.id.videoId;

    // can use tick ES6 syntax
    // ex: const videoSrc = `https://www.youtube.com/embed/${props.video.id.videoId}`;

    return (
        <div>
            <div className="ui embed">
                <iframe 
                    frameBorder="0"
                    src={videoSrc}
                    title="{props.video.snippet.title}">
                </iframe>
            </div>
            
            <div className="ui segment">
                <h4 className="ui header">{props.video.snippet.title}</h4>
                <p>{props.video.snippet.description}</p>
            </div>
        </div>
    );
};

// export
export default videoDetail;