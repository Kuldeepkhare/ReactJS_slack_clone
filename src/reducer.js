// toggle this value with any string, to disable google auth
export const initialState = {
    user: null
}

export const actionTypes = {
    SET_USER: "SET_USER"
}

const reducer = (state, action) => {
    console.log("action", action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state, user: action.user
            }
        default:
            return state;
    }
}

export default reducer;