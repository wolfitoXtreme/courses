// 
// App
// 

// dependencies
// --------------

// npm modules
import React from 'react';
import ReactDOM from 'react-dom';

// app components
import SeasonDisplay from './season-display';
import Spinner from './spinner';

// components
// --------------

// App
class   App extends React.Component {

    /* -------------------
    Component Life Cycle Methods
    - constructor (JS native method)
    - render
    - componentDidMount
    - componentDidUpdate
    - componentWillUnmount

    - shouldComponentUpdate
    - getDerivedStateFromProps
    - getSnapshotBeforeUpdate
    ------------------- */

    // constructor method 'Component Life Cycle Method'
    // initial setup for a component
    // constructor(props) {    // ES6 - constructor function
    //     super(props);       // 'super' method from 'Component' React method
    //     this.state = {      // Initialize state object
    //         latitude: null,
    //         errorMessage: ''
    //     };
    // }

    // abbreviate way to setup the state without using the 'constructor method'
    state = {
        latitude: null,
        errorMessage: ''
    };

    // componentDidMount method 'Component Life Cycle Method'
    // ideally for loading data
    componentDidMount() {
        console.log('component mounted successfully!');

        // Geolocation API (Browser built in), mor info:
        // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
        // Can be forced through Chrome Developer Tools, Console -> Console drawer -> Sensors  
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('state => ', position);

                this.setState({ // React's changes state function
                    latitude: position.coords.latitude
                });
            }, 
            (err) => {
                this.setState({
                    errorMessage: err.message
                });
            }
        );
    }

    // componentDidUpdate method 'Component Life Cycle Method'
    // ideally to load more data when 'state/props' changes
    componentDidUpdate() {
        console.log('component updated successfully!');
    }

    // componentWillUnmount method 'Component Life Cycle Method'
    // ideally for cleaning up non related React code
    componentWillUnmount() {

    }

    // custom helper method to get the content first before actually rendering it
    // in order to avoid returning several return calls within the 
    // same render method call
    renderContent() {
        console.log('component rendered');
        if(this.state.errorMessage && !this.state.latitude) {
            return <div>Error: {this.state.errorMessage}</div>;
        }
        if(!this.state.errorMessage && this.state.latitude) {
            return (
                <SeasonDisplay 
                    latitude={this.state.latitude}
                />
            ); 
        }

        return (
            <Spinner 
                message="Please accept the location request"
            />
        );
    }

    // render method 'Component Life Cycle Method'
    // specifically for only render JSX
    render() {
        return(
            /* -------------------
            Can't use objects as an text output but with in-line style
            declarations (an object), they can with the proper syntax
            ------------------- */
            <div style={
                {   
                    width: '100%',
                    height: '100%',
                    border: '12px solid black',
                    position: 'absolute'
                }
            }>
                {this.renderContent()}
            </div> 
        );
    }

};


ReactDOM.render(
    <App />,
    document.querySelector('#root')
);