import * as actions from "./../actions/actiontype";

const initialState = {
    departments :[{
        id:'0'
    }]
};

const loadDepartment = (state = initialState, action) => {
    switch(action.typ){
        case actions.SET_FILLED_DEPARTMENT:
            return  Object.assign({}, state, {
                departments: [
                    ...state.departments,
                    action.payload
                ]
            });        
        default:
            return state;
    }
};
export default loadDepartment