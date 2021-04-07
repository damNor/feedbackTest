import * as actions from "./../actions/actiontype";

const loadStateReducer = (state="loading",action) => {
    switch (action.type) {
        case actions.SET_CONFIG_STATE:
            return action.payload;
        default:
            return state;
    }
}
export default loadStateReducer;
