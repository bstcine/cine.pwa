/**
 * Created by lidangkun on 2018/7/26.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lWordAction } from '@/action/lWordAction';
import Word from '../component/Word';
import { getParam, addParam } from '@/util/urlUtil';

class WordContainer extends Component {

    constructor(props) {
        super(props);

        // 获取参数
        this.param = getParam();
    }

    componentDidMount() {
        // 准备访问
        let { actions } = this.props;
        actions.loadWordList(this.param);
    }

    backLearnHome() {
        location.href = '/learn/task';
    }
    gotoTest() {
        let testHref = addParam('/learn/word/quiz', this.param);
        location.href = testHref;
    }

    render() {
        let { result, action } = this.props;
        return (
            <Word
                result={result}
                action={action}
                backAction={ () => { this.backLearnHome() }}
                quizAction={ () => { this.gotoTest() }}
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
    actions: bindActionCreators(lWordAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    WordContainer
);