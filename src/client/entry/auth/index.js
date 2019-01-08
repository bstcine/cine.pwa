import React from 'react';
import ReactDOM from 'react-dom';
import Entry from '@/component/Entry';
import { GRouter } from '@/g/component';
import '@/entry/auth/asset/style/index.less';
import routes from './routes';

class Learn extends Entry {
    render() {
        return <GRouter routes={routes} />;
    }
}

ReactDOM.render(<Learn />, document.getElementById('root'));
