import * as actions from "./../actions/actiontype";


const loadStateReducer = (state="loading state reducer", action) => 
{
    switch (action.type) 
    {
        case actions.SET_CONFIG_STATE:
            return action.payload;
        default:
            return state;
    }
}
export default loadStateReducer;
