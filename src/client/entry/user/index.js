import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import CThemeProvider from '@/component/CThemeProvider';
import routes from './routes';
import { GRouter } from '@/g/component';

const store = createStore(reducer, applyMiddleware(thunk));

render(
    <CThemeProvider>
        <Provider store={store}>
            <GRouter routes={routes} />
        </Provider>
    </CThemeProvider>,
    document.getElementById('root')
);
