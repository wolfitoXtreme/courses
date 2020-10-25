import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import './index.scss';
import App from './App';

// import reducer from './store/reducer'; // moved to reducer folders (splitted reducers)
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const reducer = combineReducers({
  counterRd: counterReducer,
  resultRd: resultReducer
});

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
