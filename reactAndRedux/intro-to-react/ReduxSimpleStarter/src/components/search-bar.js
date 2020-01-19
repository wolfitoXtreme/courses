// 
// Search bar
// 

// dependencies
// --------------


/* -------------------
Imports React and set variable 'Component' as React.Component,
same as defining: const Component = React.Component;
------------------- */
// import React from 'react'; // before
import React, { Component } from 'react';


// components
// --------------

// search bar (functional component)
// const SearchBar = () => {
//     return <input />;
// };

// search bar (class component)

/* -------------------
Components that have an internal memory of its 'state' changes
------------------- */
class SearchBar extends Component { // create a class and extend it with 
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

        this.state = { // initializing state and assigning variables to it
            term: ''
        }; 
    }

    /* -------------------
    Method to add event handler, not used example, see below. 
    ------------------- */
    // onChange event handler
    onInputChange(term) {
        this.setState({ term }); // abreviated ES6 syntax for term: term
        this.props.onSearchTermChange(term);
    };                                  


    /* -------------------
    Every React class based component, needs a 'render method'
    ------------------- */
    // render
    render() { // ES6 method syntax
        // return <input onChange={this.onInputChange} />;  // add event handler to 'onChage' (React Event)
                                                            // use {} to include JS variables inside JSX
        
        console.log(this); // this points to SearchBar component

        // use of this.setState React method to change component state 
        return ( 
            /* -------------------
            setting the state value through the component, example 
            ------------------- */
            // <div>
            //      <input onChange={event => this.setState({ term: event.target.value })} />
            // Value of input is: { this.state.term }
            // </div>

            /* -------------------
            setting the state value through the component, and setting the value of the component
            to whatever is retrieved, 'controlled component'

            - value: term within this class
            - onChange: function to set onSearchTermChange main component search term
            - placeholder
            ------------------- */
            <div className="search-bar">
                <input 
                    value={ this.state.term }
                    onChange={(event) => this.onInputChange(event.target.value)}
                    placeholder="search phrase"
                />
            </div>
        );
    }
}

export default SearchBar; // ES6 exports the component