// 
// Song Detail
// 

// dependencies
// --------------

// npm modules
import React from 'react';
import {connect} from 'react-redux';

//components

// --

// logic
// --------------

// state
/*-------------------
will return the 'state' as 'props' coming from 'reducers' included in App, 'reducers'
-------------------*/
const mapStateToProps = (state) => {
    console.log('SongDetail Component mapStateToProps', state.selectedSong);
    return {song: state.selectedSong};
};

// components
// --------------

// Song Detail
const SongDetail = (props) => {
    console.log('SongDetail Component props => ', props);

    if(!props.song) { // song is null
        return(
            <div>No song yet selected</div>
        );
    }
    
    const song = props.song;
    
    return(
        <div>
            <h3>Details for</h3>
            <p>
            Title: {song.title}<br />
            Duration: {song.duration}
            </p>
        </div>
    );
};

// export
export default connect(
    // pass the props to the current component 'song detail'
    mapStateToProps
)(SongDetail);