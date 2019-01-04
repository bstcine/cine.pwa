import React from 'react';
import ReactDOM from 'react-dom';
import Entry from '@/component/Entry';
import './asset/style/index.less';
import { GRouter } from '@/g/component';
import routes from './routes';

class Temp extends Entry {
    render() {
        return <GRouter routes={routes} />;
    }
}

ReactDOM.render(<Temp />, document.getElementById('root'));
