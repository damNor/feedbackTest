import * as actions from "./../actions/actiontype";

const configReducer = (state={}, action) => 
{
    switch (action.type) 
    {
        case actions.SET_CONFIG:
            return {...state,...action.payload}
        default:
            return state;
    }
}
export default configReducer;
