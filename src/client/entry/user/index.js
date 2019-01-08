import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import CThemeProvider from '@/component/CThemeProvider';
import routes from './routes';
import { GRouter } from '@/g/component';
import Entry from '@/component/Entry';
import ReactDOM from 'react-dom';

const store = createStore(reducer, applyMiddleware(thunk));
class User extends Entry {
    render() {
        return (
            <CThemeProvider>
                <Provider store={store}>
                    <GRouter routes={routes} />
                </Provider>
            </CThemeProvider>
        );
    }
}

ReactDOM.render(<User />, document.getElementById('root'));
