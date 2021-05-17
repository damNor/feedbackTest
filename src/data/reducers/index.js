import {combineReducers} from 'redux';

import configReducer from './config'
import selectReducer from './select'
import dataReducer from './data'
import tabReducer from './tab'
import loadstateReducer from './loadstate'

const allReducer = combineReducers({
        config      : configReducer,
        select      : selectReducer,
        data        : dataReducer,
        tab         : tabReducer,
        loadstate   : loadstateReducer
});

export default allReducer;
