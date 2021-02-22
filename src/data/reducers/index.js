import {combineReducers} from 'redux';

import configReducer from './config'
import selectReducer from './select'
import dataReducer from './data'

const allReducer = combineReducers({
    config: configReducer,
    select: selectReducer,
    data: dataReducer
});

export default allReducer;
