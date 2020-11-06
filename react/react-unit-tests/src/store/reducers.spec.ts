import reducer from './reducer';
import ActionTypes from './actions';

describe('Reducers tests', () => {
  it('Should return the initial state', () => {
    // reducer is undefined ad the beginning
    expect(reducer(undefined, {})).toEqual({
      people: [],
    });
  });

  it('Should store "John Doe" state', () => {
    // reducer is undefined ad the beginning
    expect(
      reducer(
        { people: [] }, // initial state
        {
          // action
          type: ActionTypes.ADD_PERSON,
          person: { age: 11, name: 'John Doe' },
          id: 1604660167313,
        }
      )
    ).toEqual({
      people: [{ id: 1604660167313, value: { age: 11, name: 'John Doe' } }],
    });
  });

  it('Should remove "John Doe" state', () => {
    // reducer is undefined ad the beginning
    expect(
      reducer(
        {
          people: [
            { id: 1604660167313, value: { age: 11, name: 'John Doe' } },
            { id: 1604660167314, value: { age: 28, name: 'Jane Doe' } },
          ],
        }, // initial state
        {
          // action
          type: ActionTypes.REMOVE_PERSON,
          id: 1604660167313,
        }
      )
    ).toEqual({
      people: [{ id: 1604660167314, value: { age: 28, name: 'Jane Doe' } }],
    });
  });
});
