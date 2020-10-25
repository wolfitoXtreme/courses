import React, { Component } from 'react';

import Counter from './containers/Counter/Counter';
import CounterRedux from './containers/Counter/CounterRedux';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter />
        <CounterRedux />
      </div>
    );
  }
}

export default App;
