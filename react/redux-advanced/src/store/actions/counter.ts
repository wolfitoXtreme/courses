import ActionTypes from './actionTypes';

// Actions creators
export const add = () => {
  return {
    type: ActionTypes.ADD,
  };
};

export const remove = () => {
  return {
    type: ActionTypes.REMOVE,
  };
};

export const multiply = (value: number) => {
  return {
    type: ActionTypes.MULTIPLY,
    value: value,
  };
};

export const divide = (value: number) => {
  return {
    type: ActionTypes.DIVIDE,
    value: value,
  };
};
