/**
 * Created by lidangkun on 2018/6/15.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionVocabularyTest } from '@/action/lVocabularyTestAction';
import VocabularyTest from  '../component/vocabularyTest';
// import { getParam } from '@/util/urlUtil';

class VocabularyTestContainer extends Component {

    componentDidMount() {
        // // 获取参数
        // let param = getParam();
        //
        // let startIndex = param.start_index;
        // let endIndex = param.end_index;
        // let wordType = param.word_type;
        //
        // // 准备访问
        // let { actions } = this.props;
    }

    render() {
        return (
            <React.Fragment>
                <VocabularyTest />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionVocabularyTest, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    VocabularyTestContainer
);