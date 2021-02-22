import React from 'react';
import Templates from './templates'

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './data/reducers';

const App = () => {
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return <Provider store={store}>
        <Templates />
    </Provider>
}

export default App;
