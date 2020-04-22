const initialState = {
    cuisine: ''
}

const reducer = (currentState = initialState, action) => {
    if (action.type === 'CHANGE') {
        return { // change state in an immutable way
            ...currentState,
            cuisine: action.value
        }
    }
    return currentState;
}

export default reducer;