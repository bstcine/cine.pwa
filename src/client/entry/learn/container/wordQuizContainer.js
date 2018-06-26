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
        let { rows, isTest, actions } = this.props;
        return (
            <React.Fragment>
                <VocabularyTest
                    rows={rows}
                    param={this.param}
                    isTest={isTest}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        rows: state.vocabularyTestRedu.get('rows'),
        isTest: state.vocabularyTestRedu.get('isTest'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionVocabularyTest, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    VocabularyTestContainer
);