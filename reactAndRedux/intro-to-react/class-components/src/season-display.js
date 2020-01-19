// 
// App
// 

// dependencies
// --------------

// npm modules
import React from 'react';

// app components
import './season-display.css'; // Webpack CSS import syntax, will import styles as embedded

// logic
// --------------
const   getSeason = (latitude, month) => {
    if(month > 2 && month < 9) {
        return latitude > 0 ? 'summer': 'winter';
    }
    else {
        return latitude > 0 ? 'winter': 'summer';
    }
};

// components
// --------------

// Season Display
const   SesonDisplay = (props) => {

    // init configuration
    const seasonConfig = {
        summer: {
            text: 'Let\'s hit the beach!!',
            iconName: 'sun'
        },
        winter: {
            text: 'Burr, its chilly',
            iconName: 'snowflake'
        }
    };

    /* -------------------
    // Sending data as variables
    const   season = getSeason(props.latitude, new Date().getMonth()),
            text = season === 'winter' ? 'Burr, its chilly' : 'Lets hit the beach!!',
            icon = season === 'winter' ? 'snowflake' : 'sun';
    ------------------- */

    // helper function
    const   season = getSeason(props.latitude, new Date().getMonth()),
            /* -------------------
            ES6 syntax to extract variable names, 
            same as:
            const text = seasonConfig.season.text;
            conts iconName = seasonConfig.season.iconName;
            ------------------- */
            {text, iconName } = seasonConfig[season];   

    return(
        <div className={`season-display ${season}`}>
            {/*
                Curly brackets serve to place variables or any other JS logic.

                ES6 'back tick (`)' syntax useful to concatenate variables with strings
            */}
            <i className={`${iconName} massive icon icon-left`}></i>
            <h1>{text}</h1>
            <i className={`${iconName} massive icon icon-right`}></i>
        </div>
    );
};

export default SesonDisplay; // ES6 exports the component