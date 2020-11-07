import actionTypes from '../actions/actionTypes';
import { updateState } from '../utilities';

const initialState = {
  counter: 0,
};

const reducer = (
  state: { counter: number } = initialState,
  action: { type: string; value: number }
) => {
  const addNumber = () => {
    // return {
    //   ...state,
    //   counter: state.counter + 1,
    // };
    return updateState(state, { counter: state.counter + 1 });
  };

  const removeNumber = () => {
    // return {
    //   ...state,
    //   counter: state.counter - 1,
    // };
    return updateState(state, { counter: state.counter - 1 });
  };

  const multiplyNumber = () => {
    // return {
    //   ...state,
    //   counter: state.counter * action.value,
    // };
    return updateState(state, { counter: state.counter * action.value });
  };

  const divideNumber = () => {
    // return {
    //   ...state,
    //   counter: state.counter / action.value,
    // };
    return updateState(state, { counter: state.counter / action.value });
  };

  const actions: Record<string, any> = {
    [actionTypes.ADD]: addNumber,
    [actionTypes.REMOVE]: removeNumber,
    [actionTypes.MULTIPLY]: multiplyNumber,
    [actionTypes.DIVIDE]: divideNumber,
  };

  if (typeof (actions as any)[action.type] === 'function') {
    return actions[action.type](action.value);
  }

  return state;
};

export default reducer;
