// 
// App
// 

// dependencies
// --------------

// npm modules
import React from 'react';

// components

// 

// logic
// --------------

//

// components
// --------------

// SearchBar
class SearchBar extends React.Component {
    
    // constructor method
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
    };

    // onInputChange custom method
    // onInputChange(event) {
    //     console.log(event.target.value);
    // }
    
    /*-------------------
    // custom function
    made arrow function, instaed of using a custom method,
    to retain the value of this
    can be also achieved inside the constructor
    like -> this.onFormSubmit = this.onFormSubmit.bind(this);
    and inside the returned JSX
    like -> onSubmit={(event) => this.onFormSubmit(event)}
    -------------------*/
    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.onSearchSubmit(this.state.term);
    };

    // componentDidMount method
    componentDidMount() {

    };
    
    // render method
    render() {
        return(
            <div className="ui segment">
                <form 
                    action=""
                    onSubmit={this.onFormSubmit}
                    className="ui form"
                >
                    <label htmlFor="">image search</label>
                    {/*
                    parenthesis are not included inside the function 'this.onInputChange',
                    it is a callback function within an event handler 'onChange'

                    <input 
                        type="text" 
                        className="field"
                        onChange={this.onInputChange}
                        onClick={this.onInputClick}
                    />

                    */}


                    {/* -------------------
                    setting the component State value through the component, 
                    and setting the value of the component
                    to whatever is retrieved, 'controlled component'
                    ------------------- */}
                    <input 
                        type="text" 
                        className="field"
                        value={this.state.term}
                        onChange={(e) => this.setState({term: e.target.value})}
                    />
                </form>
            </div>
        );
    };

};

export default SearchBar; // ES6 exports the component
