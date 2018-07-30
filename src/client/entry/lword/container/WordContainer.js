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
        let testHref = addParam('/lword/quiz', this.param);
        location.href = testHref;
    }
    gotoList() {
        let listHref = addParam('/lword/card', this.param);
        location.href = listHref;
    }

    render() {
        let { result, action } = this.props;
        return (
            <Word
                result={result}
                action={action}
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
    actions: bindActionCreators(lWordAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    WordContainer
);