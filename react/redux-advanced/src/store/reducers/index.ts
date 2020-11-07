import { combineReducers } from 'redux';

import counterReducer from './counter';
import resultReducer from './result';

export const RootReducer = combineReducers({
  counterRd: counterReducer,
  resultRd: resultReducer,
});

export type StateType = ReturnType<typeof RootReducer>;
