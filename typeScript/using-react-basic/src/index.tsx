// ---------------------
//  Index
// ---------------------

// dependencies
// --------------

// npm modules
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// components
import {Home} from './components/home';

// render components
// --------------

ReactDOM.render(
    <Home name="John Doe" age={27} />,
    document.querySelector('.js-app')
);