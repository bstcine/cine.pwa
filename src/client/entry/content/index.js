import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';
import './asset/style/index.less';
import Bundle    from '@/component/Bundle';
import appBanner from '@/util/appBanner';
import Footer    from '@/component/Footer';
import Router    from '@/component/Router';
import EntryComponent from '@/component/EntryComponent';
import Home from './component/Home';
import Course from './component/Course';
import Prepare from 'bundle-loader?lazy!./component/Prepare';
// import Prepare from './component/Prepare';
// import Home from 'bundle-loader?lazy!./component/Home';
// import Course from 'bundle-loader?lazy!./component/Course';


const Loading = () =>  <div style={{background: '#fff', width: '400px', height: '300px', fontSize: '40px', color: '#000'}}>
            Loading...
        </div>


const createComponent = (component, props) => (
    <Bundle load={component}>{Component => (Component ? <Component {...props} /> : <Loading />)}</Bundle>
);

class Content extends EntryComponent {
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
                <Router>
                    <React.Fragment>
                        <Route exact path="/" component={Home} />
                        <Route path="/content/course" component={Course} />
                        <Route path="/content/prepare" component={props => createComponent(Prepare, props)} />
                    </React.Fragment>
                </Router>
                <Footer />
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Content />, document.getElementById('root'));
