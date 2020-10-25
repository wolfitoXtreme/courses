import * as actionTypes from "../actions";

const initialState = {
  results: [],
};

const reducer = (state = initialState, action) => {
  console.log("reducer action: ", action.type, action.value);

  const storeResult = () => {
    console.log("storeResult: ", state.results);
    return {
      ...state,
      // results: state.results.concat({ id: new Date().getTime(), value: state.counter }) // concat does not alter the original array, before combining reducers
      results: state.results.concat({
        id: new Date().getTime(),
        value: action.result,
      }),
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

  const actions = {
    [actionTypes.STORE_RESULT]: storeResult,
    [actionTypes.DELETE_RESULT]: deleteResult,
  };

  if (typeof actions[action.type] === "function") {
    console.log(
      "returning...",
      action.type,
      action.value,
      action.id,
      action.result
    );
    return actions[action.type](action.value);
  }
  console.log("RESULT REDUCER...");
  return state;
};

export default reducer;
