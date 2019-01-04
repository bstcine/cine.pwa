import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import Entry from '@/component/Entry';
import { reduxLogger } from '@/util/loggerUtil';
import { GRouter } from '@/g/component';
import routes from './routes';

const store = createStore(rootReducer, applyMiddleware(thunk, reduxLogger));

class Quiz extends Entry {
    render() {
        return (
            <Provider store={store}>
                <GRouter routes={routes} />
            </Provider>
        );
    }
}

ReactDOM.render(<Quiz />, document.getElementById('root'));
