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
                param={this.param}
                result={result}
                actions={actions}
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