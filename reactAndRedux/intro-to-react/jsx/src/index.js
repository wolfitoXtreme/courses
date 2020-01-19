// 
// App
// 

// dependencies
// --------------

// npm modules
import React from 'react';          // React
import ReactDOM from 'react-dom';   // React Dom 

// app components


// App
// --------------

// components
const App = () => {

    const   labelTetx = 'label string',
            buttonText = {text: 'Text button variable'};

    return (
        <div>
            <h1>Hi there!</h1>
            {/*
                htmlFor and className properties are used on JSX
                because 'for' and 'class' are restricted keywords 
            */}
            <label htmlFor="name" clasName="label-class">   
                {labelTetx.text}
            </label>

            <input type="text" id="name" />
            {/*
                Can't use objects as an text output but with in-line style
                declarations (an object), they can with the proper syntax
            */}
            <button 
                style=  {{
                            backgroundColor: 'pink',
                            color: 'white',
                            padding: '4px 8px',
                            border: '1px solid red'
                        }}
            >
            {buttonText.text}
            </button>
        </div>
    );
};


// render components
ReactDOM.render(
    <App />,                        // renders an instance of a component
    document.querySelector('#root') // DOM target to render the component to
);