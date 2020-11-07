import ActionTypes from './actionTypes';
// import { Dispatch } from 'redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StateType } from '../reducers/index';

// Using Asynchronous Action Creators

type ActionType = {
  type: string;
  result?: number;
  id?: number;
};

const actionRequest = (payload: ActionType, ms: number) =>
  new Promise<ActionType>((resolve) => {
    setTimeout(() => {
      console.log('data retrieved..', resolve, payload);
      return resolve(payload);
    }, ms);
  });

// without Async/Request
const saveResult = (result: number) => {
  return {
    type: ActionTypes.STORE_RESULT,
    result: result,
  };
};

export const storeResult = (
  result: number
): ThunkAction<void, StateType, unknown, Action<string>> => {
  // before Redux Thunk (Async call)
  // return {
  //   type: ActionTypes.STORE_RESULT,
  //   result: result,
  // };

  // Redux Thunk (Async call)
  return (dispatch, getState) => {
    // same as bellow without promise
    // setTimeout(() => {
    //   dispatch(saveResult(result));
    // }, 1500);
    const action = {
      type: ActionTypes.STORE_RESULT,
      result: result,
    };

    const oldVal = getState().counterRd.counter;

    console.log('current state is: ', oldVal);

    return (async () => {
      console.log('calling...');

      dispatch(await actionRequest(action, 500));
    })();
  };
};

export const deleteResult = (
  id: number
): ThunkAction<void, StateType, unknown, Action<string>> => {
  // before Redux Thunk (Async call)
  // return {
  //   type: ActionTypes.DELETE_RESULT,
  //   id: id,
  // };

  // Redux Thunk (Async call)
  return (dispatch) => {
    // same as bellow without promise
    // setTimeout(() => {
    //   dispatch(saveResult(result));
    // }, 1500);
    const action = {
      type: ActionTypes.DELETE_RESULT,
      id: id,
    };

    return (async () => {
      console.log('calling...');
      dispatch(await actionRequest(action, 500));
    })();
  };
};
