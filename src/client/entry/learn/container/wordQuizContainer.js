/**
 * Created by lidangkun on 2018/6/15.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionVocabularyTest } from '@/action/lVocabularyTestAction';
import VocabularyTest from  '../component/vocabularyTest';
import { getParam } from '@/util/urlUtil';

class VocabularyTestContainer extends Component {
    constructor(props) {
        super(props);
        // 获取参数
        let param = getParam();
        let startIndex = param.start_index;
        let endIndex = param.end_index;
        let wordType = param.word_type;
        this.param = {
            startIndex: startIndex,
            endIndex: endIndex,
            wordType: wordType,
        };
    }
    componentDidMount() {
        // 准备访问
        let { actions } = this.props;
        actions.loadWords(this.param.startIndex, this.param.endIndex, this.param.wordType);
    }

    render() {
        let { isTest, selectStatus, rows, correctCount, content, actions } = this.props;
        return (
            <React.Fragment>
                <VocabularyTest
                    param={this.param}
                    isTest={isTest}
                    selectStatus={selectStatus}
                    rows={rows}
                    correctCount={correctCount}
                    content={content}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isTest: state.vocabularyTestRedu.get('isTest'),
        selectStatus: state.vocabularyTestRedu.get('selectStatus'),
        rows: state.vocabularyTestRedu.get('rows'),
        content: state.vocabularyTestRedu.get('content'),
        correctCount: state.vocabularyTestRedu.get('correctCount'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionVocabularyTest, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    VocabularyTestContainer
);