import * as actions from "./../actions/actiontype";

const initialState = {
    departments :[
        // {
    //     id:null,
    //     rating:null
    // }
]
};

const loadDepartment = (state = initialState, action) => 
{
    /* 
    // try to apply update object array in a reducer
    // from this https://stackoverflow.com/questions/46790746/update-array-object-in-react-redux-reducer
    // but still failed
    */
    const department = state.departments.findIndex(p => p.departmentID === action.payload.departmentID)
    // console.log('loadDepartment ', state.department); 

    switch(action.type)
    {
        
        case actions.SET_FILLED_DEPARTMENT:
            /* 
            // try to apply update object array in a reducer
            // but still failed
            return {
                ...state, departments:[...state.departments.filter(p => p !== department), action.payload ]
            } 
            */
            return  Object.assign({}, state, {
                departments: [
                    ...state.departments,
                    action.payload
                ]
            });         
           
            break;
        case actions.SET_UPDATE_DEPARTMENT:
            return {
                ...state, departments:[...state.departments.filter(p => p !== department), { ...department,status:1 } ]
            }
            break;
        default:
            return state;
    }
};
export default loadDepartment