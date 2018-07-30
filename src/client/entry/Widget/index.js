import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import { reduxLogger } from '@/util/loggerUtil';
const store = createStore(rootReducer, applyMiddleware(thunk, reduxLogger));
import Container from './Container';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Widget extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route path="/widget" component={Container} />
                        {/* <Route path="/widget/card" component={Container} /> */}
                    </div>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<Widget />, document.getElementById('root'));
