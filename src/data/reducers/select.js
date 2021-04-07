import * as actions from "./../actions/actiontype";
import produce from "immer";

const selectReducer = (state={language:{id:0}},action) =>
    produce(state,draft =>{
        switch (action.type) {
            case actions.SELECTED_LANGUAGE:
                draft.language = action.payload;
                break;
            case actions.SELECTED_CUSTOMER:
                draft.customer_type = action.payload;
                break;
            case actions.SELECTED_BRANCH:
                draft.branch = action.payload;
                break;
            case actions.SELECTED_DEPT:
                draft.department   = action.payload;
                break;
            case actions.SELECTED_SERV:
                draft.service   = action.payload;
                break;
            case actions.SELECTED_TIMESLOT:
                draft.timeslot = action.payload;
                break;
            case actions.SELECTED_TYPE:
                draft.type = action.payload;
                break;
            default:
                return draft;
        }
    })
export default selectReducer;
