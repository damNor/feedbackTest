import * as actions from "./../actions/actiontype";

const configReducer = (state='home',action) => {
    switch (action.type) {
        case actions.SET_TAB:
            return action.payload;
        default:
            return state;
    }
}
export default configReducer;
