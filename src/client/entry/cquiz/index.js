import React from 'react';
import ReactDOM from 'react-dom';
import './asset/style/index.less';
import storeUtil from '@/util/_base/storeUtil';
import Entry from '@/component/Entry/index';
import { getParam } from '@/util/_base/urlUtil';
import routes from './routes';
import { GRouter } from '@/g/component';

class Quiz extends Entry {
    constructor(props) {
        super(props);
        console.log('constructor');
        let urlParam = getParam();

        let quiz_id = urlParam.id;
        let lesson_id = urlParam.lesson_id;
        let quiz_case = urlParam.case;
        let quiz_title = urlParam.title;

        storeUtil.set('quiz_id', quiz_id);
        storeUtil.set('lesson_id', lesson_id);
        storeUtil.set('quiz_bar', quiz_case && quiz_case == '1'); // 小节测验
        storeUtil.set('quiz_title', quiz_title);
    }

    render() {
        return (
            <div className="quiz-main">
                <GRouter routes={routes} />
            </div>
        );
    }
}

ReactDOM.render(<Quiz />, document.getElementById('root'));
