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

// logic
// --------------

// select a song
export const selectSong = (song) => { // exporting directly the function 'named' module
    
    console.log('actions selectSong =>', song);

    // returns a Redux action
    return {
        type: 'SONG_SELECTED',  // required
        payload: song           // optional
    };
};
