import * as actions from "./actiontype";

export const setConfigState         = i => ({ type: actions.SET_CONFIG_STATE, payload: i})
export const setConfig              = i => ({ type: actions.SET_CONFIG, payload: i })
export const setTab                 = i => ({ type: actions.SET_TAB, payload: i })
export const setBranches            = i => ({ type: actions.SET_BRANCH, payload: i })
export const setDepartments         = i => ({ type: actions.SET_DEPT, payload: i })
export const setServices            = i => ({ type: actions.SET_SERV, payload: i })
export const setTimeslots           = i => ({ type: actions.SET_TIMESLOT, payload: i })
export const setAppointment         = i => ({ type: actions.SET_APPOINTMENT, payload: i })
export const setQueue               = i => ({ type: actions.SET_QUEUE, payload: i })
export const setRating              = i => ({ type: actions.SET_RATING, payload: i }) // for rating
export const setFilledDepartment    = i => ({ type: actions.SET_FILLED_DEPARTMENT, payload: i})
export const setUpdateDepartment    = i => ({ type: actions.SET_UPDATE_DEPARTMENT, payload: i}) // not yet used

export const selectLanguage         = i => ({ type: actions.SELECTED_LANGUAGE, payload: i})
export const selectCustomerType     = i => ({ type: actions.SELECTED_CUSTOMER, payload: i})
export const selectBranch           = i => ({ type: actions.SELECTED_BRANCH, payload: i })
export const selectDepartment       = i => ({ type: actions.SELECTED_DEPT, payload: i })
export const selectService          = i => ({ type: actions.SELECTED_SERV, payload: i })
export const selectTimeslot         = i => ({ type: actions.SELECTED_TIMESLOT, payload: i })
export const selectType             = i => ({ type: actions.SELECTED_TYPE, payload: i})
export const selectRating           = i => ({ type: actions.SELECTED_RATING, payload:i }) // for rating 
export const selectFilledDepartment = i => ({ type: actions.SELECTED_FILLED_DEPARTMENT, payload:i})