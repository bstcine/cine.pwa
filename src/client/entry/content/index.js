import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import './asset/style/index.less';
import appBanner from '@/util/appBanner';
import Router from '@/component/Router';
import Entry from '@/component/Entry';
import { chunkComponent } from '@/util/chunkComponent';
import storeUtil from '@/util/_base/storeUtil';
import Home from './component/Home';
import Course from './component/Course';
// import createBrowserHistory from "history/createBrowserHistory";
// const history = createBrowserHistory()
// history.listen((location, action) => {
//   // location is an object like window.location
//   console.log('history => ',action, location.pathname, location.state);
// });
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
// OfflinePluginRuntime.install();
const PayPrepare = chunkComponent(() =>
    import(/* webpackChunkName: "content/chunk/index.pp" */ './component/PayPrepare')
);
const PayCenter = chunkComponent(() =>
    import(/* webpackChunkName: "content/chunk/index.pc" */ './component/PayCenter')
);
const PayStatus = chunkComponent(() =>
    import(/* webpackChunkName: "content/chunk/index.ps" */ './component/PayStatus')
);
const PayStripe = chunkComponent(() =>
    import(/* webpackChunkName: "content/chunk/index.pss" */ './component/PayStripe')
);

const createComponent = (Component, userRequired, props) => {
    if (userRequired && !storeUtil.getToken()) {
        location.href = '/auth/signin?redirect=' + encodeURIComponent(location.href);
        return;
    }
    return <Component {...props} />;
};

class Content extends Entry {
    constructor(props) {
        super(props);
        console.log('Content Main constructor');
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad);
    }

    handleLoad() {
        appBanner.init();
    }

    render() {
        return (
            <React.Fragment>
                {/*<Router history={history}>*/}
                <Router>
                    <React.Fragment>
                        <Route exact path="/" component={Home} />
                        <Route path="/content/course" component={Course} />
                        <Route
                            path="/pay/prepare"
                            component={props =>
                                createComponent(
                                    PayPrepare,
                                    /* userRequired */ true,
                                    props
                                )
                            }
                        />
                        <Route
                            path="/pay/center"
                            component={props =>
                                createComponent(
                                    PayCenter,
                                    /* userRequired */ true,
                                    props
                                )
                            }
                        />
                        <Route
                            path="/pay/status"
                            component={props =>
                                createComponent(
                                    PayStatus,
                                    /* userRequired */ true,
                                    props
                                )
                            }
                        />
                        <Route
                            path="/pay/oversea"
                            component={props =>
                                createComponent(
                                    PayStripe,
                                    /* userRequired */ true,
                                    props
                                )
                            }
                        />
                    </React.Fragment>
                </Router>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Content />, document.getElementById('root'));
