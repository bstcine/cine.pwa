import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import CThemeProvider from '@/component/CThemeProvider';
import { UserRouter } from './userRouter';

const store = createStore(reducer, applyMiddleware(thunk));

render(
    <CThemeProvider>
        <Provider store={store}>
            <UserRouter />
        </Provider>
    </CThemeProvider>,
    document.getElementById('root')
);
