import React from 'react';
import ReactDOM from 'react-dom';
import './asset/style/index.less';
// import appBanner from '@/util/appBanner';
import Entry from '@/component/Entry';
import routes from './routes';
import { GRouter } from '@/g/component';

class Content extends Entry {
    constructor(props) {
        super(props);
        console.log('Content Main constructor');
        // this.handleLoad = this.handleLoad.bind(this);
    }

    // componentDidMount() {
    //     window.addEventListener('load', this.handleLoad);
    // }
    //
    // componentWillUnmount() {
    //     window.removeEventListener('load', this.handleLoad);
    // }
    //
    // handleLoad() {
    //     appBanner.init();
    // }

    render() {
        return <GRouter routes={routes} />;
    }
}

ReactDOM.render(<Content />, document.getElementById('root'));
