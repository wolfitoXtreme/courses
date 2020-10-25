// Moved logic to reducers folder
import actionTypes from "./actions";

console.log("REDUCER...");

interface StateInterface {
  counter: number;
  results: any[];
}

interface ActionInterface {
  type: string;
  value: number;
  id?: number;
}

const initialState = {
  counter: 0,
  results: [],
};

const reducer = (
  state: StateInterface = initialState,
  action: ActionInterface
) => {
  console.log("Reducer action: ", action.type, action.value);

  // returning a new state via Object assign
  // const addNumber = (value) => {
  //   const newState = Object.assign({}, state); // cloning the state
  //   newState.counter = state.counter + 1;
  //   return newState;
  // };

  // returning the object state via spread operator
  const addNumber = () => {
    console.log("adding!!!!!");
    return {
      ...state,
      counter: state.counter + 1,
    };
  };

  const removeNumber = () => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  };

  const multiplyNumber = () => {
    return {
      ...state,
      counter: state.counter * action.value,
    };
  };

  const divideNumber = () => {
    return {
      ...state,
      counter: state.counter / action.value,
    };
  };

  const storeResult = () => {
    console.log("storing...", state.counter);
    return {
      ...state,
      // results: state.results.concat({ id: new Date().getTime(), value: state.counter }) // concat does not alter the original array
      results: state.results.concat({
        id: new Date().getTime(),
        value: state.counter,
      }), // concat does not alter the original array
    };
  };

  const deleteResult = () => {
    const updatedArray = state.results.filter(
      (result) => result.id !== action.id
    ); // filters return a new array
    return {
      ...state,
      results: updatedArray,
    };
  };

  const actions: Record<string, any> = {
    [actionTypes.ADD]: addNumber,
    [actionTypes.REMOVE]: removeNumber,
    [actionTypes.MULTIPLY]: multiplyNumber,
    [actionTypes.DIVIDE]: divideNumber,
    [actionTypes.STORE_RESULT]: storeResult,
    [actionTypes.DELETE_RESULT]: deleteResult,
  };

  // console.log('actions type: ', typeof (actions as any)[action.type], (actions as any)[action.type], state);

  if (typeof (actions as any)[action.type] === "function") {
    console.log("returning...", action.type, action.value, action.id);
    return actions[action.type](action.value);
  }

  return state;
};

export default reducer;
