// 
// App
// 

// dependencies
// --------------

// npm modules
import React from 'react';
// import axios from 'axios';   // to handle Ajax requests though Axios (Promise based HTTP client) instead of using 
                                // fetch native browser method
                                // uncomment to make work onSearchSubmit mehod using Axios directly

// components
import SearchBar from './search-bar';   // Search bar
import unsplash from '../api/unsplash'; // Axios configuration
import ImageList from './image-list';   // Image list

// 

// logic
// --------------

//

// components
// --------------

// App
class App extends React.Component {
    
    // constructor method
    constructor(props) {
        super(props);
        this.state = {
            images: [] // images i expected to be an array
        };
    };

    // onSearchSubmit custom method
   
    /*-------------------
    // using promise based syntax (axios API reply with a promise)
    onSearchSubmit(term) {
        console.log(term);

        // axios Ajax request
        axios.get( 
            'https://api.unsplash.com/search/photos', // request URL path
            {                                        // request configuration 
                headers: {
                    Authorization: 'Client-ID 3b2cc5839cc3353062772cb5e2cd4230fa08a865c917ed0dffb8ac768d5f1439'
                },
                params: {query: term} // query parameters
            }
        )
        .then((response) => { // call back form 'axios' promise 
            console.log(response.data.results);
        });
    };
    -------------------*/

    /*-------------------
    // using async/await syntax inside a method
    async onSearchSubmit(term) {
        console.log(term);

        // axios Ajax request
        const response = await axios.get( 
            'https://api.unsplash.com/search/photos', // request URL path
            {                                        // request configuration 
                headers: {
                    Authorization: 'Client-ID 3b2cc5839cc3353062772cb5e2cd4230fa08a865c917ed0dffb8ac768d5f1439'
                },
                params: {query: term} // query parameters
            }
        );
        console.log(response.data.results);
    };
    -------------------*/

    /*-------------------
    // using async/await syntax inside an arrow function and Axios
    onSearchSubmit = async(term) => {
        console.log(term);

        // axios Ajax request
        const response = await axios.get( 
            'https://api.unsplash.com/search/photos', // request URL path
            {                                        // request configuration 
                headers: {
                    Authorization: 'Client-ID 3b2cc5839cc3353062772cb5e2cd4230fa08a865c917ed0dffb8ac768d5f1439'
                },
                params: {query: term} // query parameters
            }
        );
        
        // update App component state
        this.setState({images: response.data.results});
    };
    -------------------*/

    // using predefined configuration of Axios (unsplash)
    onSearchSubmit = async(term) => {
        console.log(term);

        // axios Ajax request
        const response = await unsplash.get(
            '/search/photos',           // request URL path
            {params: {query: term}}     // query parameters
        );
        
        // update App component state
        this.setState({images: response.data.results});
    };

    // render method
    render() {
        return(
            <div className="ui container" style={{marginTop: '10px'}}>
                <SearchBar 
                    onSearchSubmit={this.onSearchSubmit}
                    testProp="this is a test to see the value of this"
                />
                Found: {this.state.images.length} images
                <ImageList 
                    images={this.state.images}
                />
            </div>
        );
    };


};


export default App; // ES6 exports the component