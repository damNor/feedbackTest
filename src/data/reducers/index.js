import {combineReducers} from 'redux';

import configReducer from './config'
import selectReducer from './select'
import dataReducer from './data'
import tabReducer from './tab'
import loadstateReducer from './loadstate'
import loadDepartment from './loadDepartment'
const allReducer = combineReducers({
        config      : configReducer,
        select      : selectReducer,
        data        : dataReducer,
        tab         : tabReducer,
        loadstate   : loadstateReducer,
        rating      : loadDepartment 
});

export default allReducer;
