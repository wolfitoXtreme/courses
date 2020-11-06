import React, { Component } from 'react';

import List from './components/List/List';
import People from './components/People/People';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <List authenticated={true} amount={3} />
        <People />
      </div>
    );
  }
}

export default App;
