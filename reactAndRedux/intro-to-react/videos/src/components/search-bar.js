// 
// Search bar
// 

// dependencies
// --------------
// npm modules
import React from 'react';


//components

// 

// logic
// --------------

//

// components
// --------------
class SearchBar extends React.Component {
    // constructor method
    constructor(props) {
        super(props);
        this.state = {term: ''};
    }
    
   
    // componentDidMount method
    componentDidMount() {
    }
    
    
    // onInputChange custom function
    onInputChange = (event) => {
        console.log(event.target.value);
        this.setState({term: event.target.value});
        console.log('state =' + this.state.term);
    };

    // onFormSubmit custom function
    onFormSubmit = (event) => {
        event.preventDefault();

        // callback from parent component 'App'
        this.props.onFormSubmit(this.state.term);
    };

    // render method
    render() {
        return (
            <div className="ui segment search-bar">
                <form 
                    action="" 
                    onSubmit={this.onFormSubmit}
                    className="ui form"
                >
                    <div className="field">
                        <label htmlFor="">Video search</label>
                        <input 
                            type="text"
                            value={this.state.term}
                            onChange={this.onInputChange}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

// export
export default SearchBar;
