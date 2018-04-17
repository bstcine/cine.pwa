// import React from 'react';
// import {render} from 'react-dom';
// import {Provider} from 'react-redux';
// import {createStore, applyMiddleware} from 'redux';
// import rootReducer from './reducer';
// import thunk from 'redux-thunk';
// import App from './container/App';
// const store = createStore(rootReducer, applyMiddleware(thunk));
// render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('root')
// );

import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
import {BrowserRouter as Router} from 'react-router-dom';
import Root from './container/Root';

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
    <Router>
        <Root store={store} />
    </Router>,
    document.getElementById('root')
);
