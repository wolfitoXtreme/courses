// 
// Action creators
// 

/*-------------------
Action creators will update and return the 'state'
Action creators will always return an object with 'type' and a 'payload'
Action Creators can optionally have a 'payload'

--------------
Redux cycle:
--------------

- Action creator ('actions'), produce an action
- This action is sent 'dispatch' to the Redux Store ex. store.dispatch(action());
- The action is sent to Reducers
- Reducers will create a new State

-------------------*/

// dependencies
// --------------

// npm modules

// components
import jsonPlaceholder from '../apis/json-placeholder';


// logic
// --------------

// export creator
export const fetchPosts = () => { // exporting directly the function 'named' module
    
    // Normal returned action
    // const response = jsonPlaceholder.get('/posts');

    // console.log(response);

    // return {
    //     type: 'FETCH_POST', // required
    //     payload: response
    // };

    // Async returned action via Middleware 'Redux-thunk'
    return async function(dispatch, getState) {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({
            type: 'FETCH_POST', // required
            payload: response.data // resulting data from API
        });
    };
};

// abbreviated version
/*-------------------
export const fetchPosts = () => async dispatch => {
    const resposnse = await jsonPlaceholder.get('/posts');

    dispatch({
        type: 'FETCH_POST', // required
        payload: response
    });
} 
-------------------*/

