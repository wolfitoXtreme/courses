// 
// Comment Details
// 

// dependencies
// --------------

// npm modules
import React from 'react';

// components

// comment detail
const CommentDetail = (props) => { // 'props', name of object passed from parent component 'App'
    return (
        <div className="comment">
            <a href="/" className="avatar">
                <img src={props.avatar} alt="avatar"/>
            </a>
            <div className="content">
                <a href="/" className="author">{props.author}</a>
                <div className="metadata">
                    <span className="date">{props.timeAgo}</span>
                </div>
                <div className="text">{props.post}</div>
            </div>
        </div>
    );
};

export default CommentDetail; // ES6 exports the component