import * as actions from "./../actions/actiontype";
import produce from "immer";

const dataReducer = ( state={} , action ) =>
    produce(state, draft =>
    {
        switch (action.type) 
        {
            case actions.SET_BRANCH:
                draft.branches = action.payload;
                break;
            case actions.SET_DEPT:
                draft.departments = action.payload;
                break;
            case actions.SET_SERV:
                draft.services = action.payload;
                break;
            case actions.SET_TIMESLOT:
                draft.timeslots = action.payload;
                break;
            case actions.SET_APPOINTMENT:
                draft.appointment = action.payload;
                break;
            case actions.SET_QUEUE:
                draft.queue = action.payload;
                break;
            default:
                return draft;
        }
    })
export default dataReducer;
