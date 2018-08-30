/**
 * Created by lidangkun on 2018/7/26.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wordAction } from '@/action/wordAction';
import Word from '../component/Word';
import { getParam, addParam } from '@/util/urlUtil';

class WordContainer extends Component {

    constructor(props) {
        super(props);

        // 获取参数
        this.param = getParam();
        document.title = '词汇任务';
    }

    componentDidMount() {
        let { actions } = this.props;
        // 更新top10000阶段效果
        actions.updateCourseSelectIndex(this.param);
        // 获取词汇列表
        actions.loadWordList(this.param);
    }

    backLearnHome() {
        if (!this.param.lesson_id || this.param.lesson_id.indexOf('-') === -1) {
            location.href = '/learn/task';
            return;
        }
        const lessonCom = this.param.lesson_id.split('-');
        const start_index = parseInt(lessonCom[0], 10);
        let paramStr = '';
        if (start_index < 3001) {
            paramStr = 'start_index=1&range=3000';
        } else if (start_index < 6001) {
            paramStr = 'start_index=3001&range=3000';
        } else {
            paramStr = 'start_index=6001&range=4000';
        }
        location.href = `/lword/course?${paramStr}`;
    }
    gotoTest() {
        let testHref = addParam('/lword/quiz', this.param);
        location.href = testHref;
    }
    gotoList() {
        let listHref = addParam('/lword/card', this.param);
        location.href = listHref;
    }

    render() {
        let { result, actions } = this.props;
        return (
            <Word
                result={result}
                actions={actions}
                backAction={ () => { this.backLearnHome() }}
                quizAction={ () => { this.gotoTest() }}
                listAction={ () => { this.gotoList() }}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        result: state.WordRedu.get('result'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(wordAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    WordContainer
);