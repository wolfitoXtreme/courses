// 
// Posts reducer
//

// logic
// --------------

// export
export default (state = [], action) => { // default empty array, action
    // without checking for other actions 
    // if(action.type === 'FETCH_POST') { // return action data
    //     return action.payload;
    // }

    // return state; // return previous state

    switch(action.type) {
        case 'FETCH_POST': 
            return action.payload;
        default: 
            return state; // return previous state
    }
};