// 
// App
// 

// dependencies
// --------------

// npm modules
import React from 'react';

const Spinner = (props) => {
    return(
          <div className="ui active dimmer">
            <div className="ui big text loader">{props.message}</div>
          </div>
    );
};

// default props definition
Spinner.defaultProps = {
    message: 'Loading...'
};

export default Spinner; // ES6 exports the component