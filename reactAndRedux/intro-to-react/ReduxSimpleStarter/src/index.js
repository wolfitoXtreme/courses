// ES6 - modules are always using strict code, no directive needed

// ---
// React is a JS library that produces HTML
// through components (JS files)
// Each React component is build with JS functions
// that produces HTML snippets
// ---

// dependencies
// --------------

// npm modules
        
/* -------------------
imports react as 'React' library from 'npm' modules folder
and assign it to the variable 'React', will translate JSX code
into a call like: return React.createElement(element, null, text);
------------------- */
// import React from 'react';                  // react
import React, { Component } from 'react';   // react, sets Component class as a variable
/* -------------------
same way as above, imports reactDOM library to render 
components into the DOM
------------------- */
import ReactDOM from 'react-dom';           // react DOM renderer
import YTSearch from 'youtube-api-search';  // Youtube API search
import _ from 'lodash';     // lodash 'debounce'



// app components

/* -------------------
imports seach bar as 'SearchBar' library from 'search-bar.js' components folder
and assign it to the variable 'searchBar'. camel-case!
------------------- */
import SearchBar from './components/search-bar';    // search bar
import VideoList from './components/video-list';    // video list
import VideoDetail from './components/video-detail'; // video detail

// App configuration
// --------------
const API_KEY = 'AIzaSyCxwBD1DDxcz8URcRodO4SfLaxGt-zCqSA'; // youtube API v3 (https://console.developers.google.com/)


// App component
// --------------

// Create a new component to produce some HTML
/* -------------------
Components behave as Functions(Classes), so a component 
can have several instances created from it
------------------- */

// App (ES5 - functional component)
// const App = function() {
//     return <div>Hi!</div>; // returning JSX syntax
// };

// App (ES56 - functional component)
// const App = () => {         // ES6 syntax function declaration
//     return ( 
//     <div>
//         <SearchBar />
//     </div>
//     );  // returning JSX syntax
// };

    console.log(_.debounce);

/* -------------------
Components that have an internal memory of its 'state' changes
------------------- */
class App extends Component {   // create a class and extend it with 
                                // React.Component functionality
                                // same as: class SearchBar extends React.Component
    
    /* -------------------
    All javaScript classes have a method called 'Constructor',
    the constructor function is the only one that is called automatically, whenever 
    a new instance of the 'class' is created

    State is a plain javaScript object used to record and react to user events.
    Every React component class based, has a 'State object'.
    Every time a component 'state' changes it re-renders, and also its child components
    ------------------- */
    // state initialization
    constructor(props) {
        super(props); // calling parent method from 'Component' React method
        
        this.state = {          // initializing state and assigning variables to it
            videos: [],         // videos
            setectedVideo: null // selected videos
        };

        // set initial search
        this.videoSearch('il2');
    }

    // Method, new search
    videoSearch(term) {
        console.log('requesting API');

        // search on Youtube through Yahoo API 
        YTSearch({key: API_KEY, term: term}, (videos) => {
            // this.setState({ videos: videos });   // set state to be the result of the initial search
            // this.setState({ videos });           // ES6 syntax, key and value are the same term, thus
                                                    // can be defined both at once

            this.setState({                 // set state
                videos:         videos,     // videos result of search
                activeVideo:    videos[0]   // active video
            });
        });
    }


    /* -------------------
    Every React class based component, needs a 'render method'
    ------------------- */
    // render
    render() {

        const videoSearch = _.debounce((term) => {
                                this.videoSearch(term);
                            }, 300);

        return ( 
            <div>

                {/* -------------------
                sending the function onSearchTermChange as a parameter to SearchBar

                without debouncing:
                <SearchBar 
                    onSearchTermChange={(term) => this.videoSearch(term)}
                />
                ------------------- */}
                <SearchBar 
                    onSearchTermChange={videoSearch}
                />

                {/*
                    passing data first video from 'App' component to 'VideoDetail'
                    this is called passing 'props'
                */}
                <VideoDetail 
                    video={this.state.activeVideo}
                />

                {/*
                    passing data from 'App' component to 'VideoList'
                    this is called passing 'props'

                    NOTE: onVideoSelect is passed as a property to VideoList component.
                    Is a function defined by its syntax.
                    
                    Using abbreviated ES6 syntax for key/value pairs with same
                    key/value name can be used activeVideo:activeVideo

                    ex: onVideoSelect={activeVideo => this.setState({activeVideo})} 

                    but is fucking confusing.
                */}
                <VideoList 
                    videos={this.state.videos}
                    onVideoSelect={(selectedVideo) => this.setState({activeVideo: selectedVideo})} 
                />
            </div>
        );  // returning JSX syntax
    }
};


// Output HTML components and place them inside the DOM
ReactDOM.render(                            // renders an instance of a component
    <App />,                                // component instance of 'App'
    document.querySelector('.container')    // DOM target to render the component to
);


