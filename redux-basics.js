// Executing with Node.js in cmd prompt:  node redux-basics.js
const redux = require('redux');

const createStore = redux.createStore;
const initialState = {
    counter: 0
};

// Reducer
const rootReducer = (currentState = initialState, action) => { // Default value: currentState = initialState
    if (action.type === 'INC_COUNTER')
        return {
            ...currentState,
            counter: currentState.counter + 1
        }
    if (action.type === 'ADD_COUNTER')
        return {
            ...currentState,
            counter: currentState.counter + action.value
        }
    // returns new state, to keep it simple, lets return currentState
    return currentState;
}

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription - to inform that the state has been updated
store.subscribe(() => {
    console.log('[Subscription]', store.getState())
});

// Dispatching Action
store.dispatch({ type: 'INC_COUNTER' });
store.dispatch({ type: 'ADD_COUNTER', value: 10 });
console.log(store.getState());