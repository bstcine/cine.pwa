/**
 * Created by lidangkun on 2018/6/15.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from '@/component/Toast';
import { actionVocabularyTest } from '@/action/lVocabularyTestAction';
import VocabularyTest from  '../component/vocabularyTest'

class VocabularyTestContainer extends Component {

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