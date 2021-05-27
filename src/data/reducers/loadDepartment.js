import * as actions from "./../actions/actiontype";

const initialState = {
    departments :[
        // {
    //     id:null,
    //     rating:null
    // }
]
};

const loadDepartment = (state = initialState, action) => {
    switch(action.type){
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