// 
// Song List
// 

// dependencies
// --------------

// npm modules
import React, {Component} from 'react'; // 'default' and 'named' import
import {connect} from 'react-redux';

// components
import {selectSong} from '../actions';  // Action creator 'SelectSong' to pass to Redux
                                        // via connect, imported {named} module


// logic
// --------------

// state
/*-------------------
will return the 'state' as 'props' coming from 'reducers' included in App, 'reducers'
-------------------*/
const mapStateToProps = (state) => { // convention naming, gets state
    console.log('SongList Component mapStateToProps =>', state);

    // outputs the state
    return {
        songs: state.songs
    };
};


// components
// --------------

// Song list
class SongList extends Component { // same 'class SongList extends React.Component without importing 'named' module
    // render list custom helper method
    renderList() {
        return this.props.songs.map((song) => { // return a JSX full result
            return(                             // returns one piece of JSX for each iteration
                <div className="item" key={song.title}>
                    <div className="right floated content">
                        {/*
                            pass onCLick IIEF function to execute the
                            function selectSong coming from props, see bellow connect module conf.
                        */}
                        <button 
                            onClick={() => this.props.selectSong(song)}
                            className="ui button primary"    
                        >
                            Select
                        </button>
                    </div>
                    <div className="content">{song.title}</div>
                </div>
            );
        });
    }

    // render method
    render() {
        console.log('SongList Component props =>', this.props);
        return(
            <div className="ui divided list">{this.renderList()}</div>
        );
    }
}

// export
export default connect(
    // pass all the APP state props to the current component 'SongList'
    mapStateToProps,
    /*-------------------
    Actions to perform
    action creator passed to update the Redux store, will execute
    store.dispatch(selectSong('the selected song')); via the connect function
    see 'basic-concepts' example
    -------------------*/
    { selectSong: selectSong }  
)(SongList);            // connect the component