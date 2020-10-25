import actionTypes from "../actions";

const initialState = {
  results: [],
};

const reducer = (
  state: { results: any[] } = initialState,
  action: { type: string; result: any[]; id?: number }
) => {
  console.log("reducer action: ", action.type, action.result);

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

  const actions: Record<string, any> = {
    [actionTypes.STORE_RESULT]: storeResult,
    [actionTypes.DELETE_RESULT]: deleteResult,
  };

  if (typeof (actions as any)[action.type] === "function") {
    return actions[action.type]();
  }

  return state;
};

export default reducer;
