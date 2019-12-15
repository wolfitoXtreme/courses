// 
// Redux Exercise
// 

console.clear(); // clearing console for multiple executions

// Action creators
// --------------

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

// create policy
const   createPolicy = (name, amount) => {
    return {
        type: 'CREATE_POLICY',   // convention naming UPERCASE + _
        payload: {
            name: name,
            amount: amount
        }
    };
};

// Delete policy
const deletePolicy = (name) => {
    return {
        type: 'DELETE_POLICY',
        payload: {
            name: name
        }
    };
};

// Create claim
const createClaim = (name, amountToCollect) => {
    return {
        type: 'CREATE_CLAIM',
        payload: {
            name: name,
            amountToCollect: amountToCollect
        }
    };
};


// Reducers
// --------------

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

// Claim history
const claimsHistory = (oldListOfClaims = [], action) => {
    /*-------------------
    oldListOfClaims = [] will set the dafault value of oldListOfClaims to be an empty array
    -------------------*/
    if(action.type === 'CREATE_CLAIM') {
        /*-------------------
        ES6 syntax returns a new array (as opposite to method 'push' 
        that modifies existing one) 
        composed by [array-items + new-item]
        -------------------*/
        return [...oldListOfClaims, action.payload];
    }

    // nothing to do
    return oldListOfClaims;
};

// accounting
const accounting = (bagOfMoney = 100, action) => {
    if(action.type === 'CREATE_CLAIM') {
        return bagOfMoney - action.payload.amountToCollect;
    }
    else if(action.type === 'CREATE_POLICY') {
        return bagOfMoney + action.payload.amount;
    }

    // nothing to do
    return bagOfMoney;
};

// policies
const policies = (listOfPolicies = [], action) => {
    if(action.type === 'CREATE_POLICY') {
        return [...listOfPolicies, action.payload.name];
    }
    else if(action.type === 'DELETE_POLICY') {

        /*-------------------
        ES6 syntax returns a new array that does not
        contain the matching item inside the array
        -------------------*/
        return listOfPolicies.filter((name) => {
            console.log('deleting...');
            return name !== action.payload.name;
        });
    }

    // nothing to do
    return listOfPolicies;
};

// Redux Store
// --------------
/*-------------------
Redux Store, contains all reducers and states of the App
-------------------*/
const {createStore, combineReducers} = Redux; // extracting methods from redux

// combining reducers
const ourReducers = combineReducers({
    accounting: accounting,
    claimsHistory: claimsHistory,
    policies: policies
});

const store = createStore(ourReducers);


// dispatching data
store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40));

store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Alex', 50));

store.dispatch(deletePolicy('Bob'));

console.log(store.getState());