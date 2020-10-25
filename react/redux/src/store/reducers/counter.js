import * as actionTypes from "../actions";

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  console.log("reducer action: ", action.type, action.value);

  const addNumber = () => {
    console.log("Adding!!!!!");
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

  const actions = {
    [actionTypes.ADD]: addNumber,
    [actionTypes.REMOVE]: removeNumber,
    [actionTypes.MULTIPLY]: multiplyNumber,
    [actionTypes.DIVIDE]: divideNumber,
  };

  if (typeof actions[action.type] === "function") {
    console.log(
      "COUNTER REDUCER, returning...",
      action.type,
      action.value,
      action.id
    );
    return actions[action.type](action.value);
  }
  console.log("COUNTER REDUCER...");
  return state;
};

export default reducer;
