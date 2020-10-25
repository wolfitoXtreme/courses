import React, { useState, useRef, useEffect } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';


const Counter = () => {
  const [counter, setCounter] = useState(0);
  const prevCounter = useRef();

  useEffect(() => {
    prevCounter.current = counter;
  });


  const counterChangedHandler = (action, value) => {
    const addNumber = (value) => {
      return setCounter(prevCounter.current + value);
    };

    const removeNumber = (value) => {
      return setCounter(prevCounter.current - value);
    };

    const multiplyNumber = (value) => {
      return setCounter(prevCounter.current * value);
    };

    const divideNumber = (value) => {
      return setCounter(prevCounter.current / value);
    };


    const actions = {
      add: addNumber,
      remove: removeNumber,
      multiply: multiplyNumber,
      divide: divideNumber
    };

    return actions[action](value);
  };

  return (
    <div>
      <h2>Counter NO REDUX</h2>
      <CounterOutput value={counter} />
      <CounterControl label="Increment" clicked={() => counterChangedHandler('add', 1)} />
      <CounterControl label="Decrement" clicked={() => counterChangedHandler('remove', 1)} />
      <CounterControl label="Multiply 5" clicked={() => counterChangedHandler('multiply', 5)} />
      <CounterControl label="Divide 5" clicked={() => counterChangedHandler('divide', 5)} />
    </div>
  );
}

export default Counter;
