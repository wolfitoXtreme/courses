import React from "react";

// functional component
/* -------------------
Also referred to as "presentational", "dumb" or "stateless"
------------------- */
const person = props => {
  // this.props when using Class components
  return (
    <div>
      <p>
        I'm a{" "}
        <strong>
          {props.name} {props.surname}
        </strong>{" "}
        an I'm {props.age} years old!
      </p>

      <p>{props.children}</p>
    </div>
  );
};

export default person;
