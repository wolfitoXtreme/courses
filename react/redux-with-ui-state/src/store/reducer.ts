// Moved logic to reducers folder
import ActionTypes from "./actions";

interface StateInterface {
  people: any[];
}

interface ActionInterface {
  type: string;
  person: string;
  id?: number;
}

const initialState = {
  people: [],
};

const reducer = (
  state: StateInterface = initialState,
  action: ActionInterface
) => {
  // returning the object state via spread operator
  const addPerson = () => {
    return {
      ...state,
      people: state.people.concat({
        id: new Date().getTime(),
        value: action.person,
      }), // concat does not alter the original array
    };
  };

  const removePerson = () => {
    const updatedArray = state.people.filter(
      (result) => result.id !== action.id
    ); // filters return a new array
    return {
      ...state,
      people: updatedArray,
    };
  };

  const actions: Record<string, any> = {
    [ActionTypes.ADD_PERSON]: addPerson,
    [ActionTypes.REMOVE_PERSON]: removePerson,
  };

  if (typeof (actions as any)[action.type] === "function") {
    return actions[action.type]();
  }

  return state;
};

export default reducer;
