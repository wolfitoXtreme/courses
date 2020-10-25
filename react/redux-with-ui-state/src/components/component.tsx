import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ActionTypes from '../store/actions';

const peopleArray = ['Jonh Doe', 'Jane Doe', 'Ritchy Doe', 'Charles Doe'];

// get the Store state
const mapStateToProps = (state: { people: any[] }) => {
  return {
    people: state.people, // points to the state
  };
};

// read as action.WHATEVER inside the reducer
// const mapDispatchToProps = (dispatch: Dispatch) => { ??
const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    onAddPerson: (person: string) =>
      dispatch({ type: ActionTypes.ADD_PERSON, person: person }),
    onRemovePerson: (id: number) =>
      dispatch({ type: ActionTypes.REMOVE_PERSON, id: id }),
  };
};

type PersonData = {
  name: string;
  age: number | string;
};

interface Props {
  people: any[];
  onAddPerson: (...args: any[]) => void;
  onRemovePerson: (...args: any[]) => void;
}

const Container: React.FC<Props> = ({
  people,
  onAddPerson,
  onRemovePerson,
}) => {
  const [nameVal, setNameVal] = useState('');
  const [ageVal, setAgeVal] = useState('');

  const onlyNumbers = (value: string) => {
    const regex = /^\d*[.]?\d*$/;
    if (regex.test(value)) {
      return setAgeVal(value);
    }
  };

  useEffect(() => {});

  const resetFields = () => {
    setNameVal('');
    setAgeVal('');
  };

  const createPerson = (): PersonData => {
    if (nameVal !== '' && ageVal !== '') {
      return {
        name: nameVal,
        age: ageVal,
      };
    }

    return {
      name: peopleArray[Math.floor(Math.random() * peopleArray.length)],
      age: Math.floor(Math.random() * Math.floor(45)),
    };
  };

  return (
    <>
      {nameVal}
      {ageVal}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={nameVal}
          onChange={(event) => setNameVal(event.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Age"
          value={ageVal}
          onChange={(event) => onlyNumbers(event.target.value)}
        />
      </div>
      <button
        className="button"
        // onClick={() => onAddPerson({ name: randomPerson(), age: randomAge() })}
        onClick={() => {
          onAddPerson(createPerson());
          resetFields();
        }}
      >
        Click to Add
      </button>
      <ul className="list">
        {people.map(({ id, value: { name, age } }) => (
          <li key={id} onClick={() => onRemovePerson(id)}>
            <b>{name}</b>
            <br />
            {age}
          </li>
        ))}
      </ul>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
