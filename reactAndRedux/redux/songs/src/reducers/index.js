// 
// Reducers
// 

/*-------------------
Reduces represent the 'state' thus contain the properties within it,
Reducers are functions and have two parameters passed to them, state and action
- Reducers will always have a default value can be 'null'. Will never return undefined (JS IIFE).
- Will always return a value
- Will never alter the original state object passed to it but return a new one that will 
  take the value of whatever was the previous state and return a new state. ()
- Reducers do not perform processes outside its own definition 'pure reducer'

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
import { combineReducers } from 'redux'; // Combine Reducers imported {named} module


// logic
// --------------

// Songs reducer
const songReducer = () => { // experting directly the function
    // returns a Redux action

    // passing static data as an example
    return [
        {
            title: 'Hotel California',
            duration: '5:55'
        },
        {
            title: 'Bohemian Rhapsody',
            duration: '4:25'
        },
        {
            title: 'Superstition',
            duration: '2:02'
        },
        {
            title: 'Smoke On The Water',
            duration: '4:05'
        }
    ];
};


// Selected song reducer
const selectedSongReducer = (selectedSong=null, action) => {

    console.log('reducers selectedSongReducer =>', selectedSong + '||' + action.type);
    
    if(action.type === 'SONG_SELECTED') {
        return action.payload;
    }

    return selectedSong;
};

// combine reducers
// these props will be the App state props
export default combineReducers({
    songs: songReducer,
    selectedSong: selectedSongReducer
});