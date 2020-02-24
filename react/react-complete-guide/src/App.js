import React, { Component } from "react";
import Person from "./Person/Person";
import "./App.css";

// Class component
/* -------------------
Also referred to as "containers", "smart" or "stateful" components
------------------- */
class App extends Component {
  /* -------------------
  'state' property only available for Class components that extends
  Class React Components, with functional components
  ------------------- */
  state = {
    persons: [
      {
        name: "John",
        surname: "Doe",
        age: 37
      },
      {
        name: "Richard",
        surname: "Doe",
        age: 17
      },
      {
        name: "Jane",
        surname: "Doe",
        age: 27
      }
    ],
    otherState: "Other State here"
  };

  // class method 'Handler'
  switchNameHandler = () => {
    console.log("clicked!");
    this.setState({
      persons: [
        {
          name: "John The Second",
          surname: "Doe",
          age: 37
        },
        {
          name: "Richard  The Third",
          surname: "Doe",
          age: 17
        },
        {
          name: "Jane The First",
          surname: "Doe",
          age: 27
        }
      ]
    });
  };

  render() {
    return (
      <div className="App">
        <h1>My App goes here!</h1>

        {/* Functional component */}
        <Person
          name={this.state.persons[0].name}
          surname={this.state.persons[0].surname}
          age={this.state.persons[0].age}
        />

        <Person
          name={this.state.persons[1].name}
          surname={this.state.persons[1].surname}
          age={this.state.persons[1].age}
        />

        <Person
          name={this.state.persons[2].name}
          surname={this.state.persons[2].surname}
          age={this.state.persons[2].age}
        >
          <strong>Is an awesome girl.</strong>
        </Person>
        {/*
        Do not add parenthesis when adding a handler or it will be executed immediately,
        should be just a reference
        */}
        <button onClick={this.switchNameHandler}>Switch name</button>
      </div>
    );

    // Above is the same as using React.createElement method
    // React.createElement(component, conf. options, children...)

    // return React.createElement(
    //   "div",
    //   null,
    //   React.createElement("h1", { className: "App" }, "React App created here")
    // );
  }
}

export default App;
