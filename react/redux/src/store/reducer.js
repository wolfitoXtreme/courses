// Moved logic to reducers folder
import * as actionTypes from './actions';

console.log('REDUCER...');

const initialState = {
  counter: 0,
  results: []
}

const reducer = (state = initialState, action) => {
  console.log('Reducer action: ', action.type, action.value);

  // returning a new state via Object assign
  // const addNumber = (value) => {
  //   const newState = Object.assign({}, state); // cloning the state
  //   newState.counter = state.counter + 1;
  //   return newState;
  // };

  // returning the object state via spread operator
  const addNumber = () => {
    return {
      ...state,
      counter: state.counter + 1
    }
  };

  const removeNumber = () => {
    return {
      ...state,
      counter: state.counter - 1
    }
  };

  const multiplyNumber = () => {
    return {
      ...state,
      counter: state.counter * action.value
    }
  };

  const divideNumber = () => {
    return {
      ...state,
      counter: state.counter / action.value
    }
  };


  const storeResult = () => {
    return {
      ...state,
      results: state.results.concat({ id: new Date().getTime(), value: state.counter }) // concat does not alter the original array
    }
  };

  const deleteResult = () => {
    const updatedArray = state.results.filter(result => result.id !== action.id); // filters return a new array
    return {
      ...state,
      results: updatedArray
    }
  }

  const actions = {
    [actionTypes.ADD]: addNumber,
    [actionTypes.REMOVE]: removeNumber,
    [actionTypes.MULTIPLY]: multiplyNumber,
    [actionTypes.DIVIDE]: divideNumber,
    [actionTypes.STORE_RESULT]: storeResult,
    [actionTypes.DELETE_RESULT]: deleteResult
  };

  // console.log('actions type: ', typeof actions[action.type]);

  if (typeof actions[action.type] === 'function') {
    console.log('returning...', action.type, action.value, action.id);
    return actions[action.type];
  }

  return state;
}

export default reducer;
