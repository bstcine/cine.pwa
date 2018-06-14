import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from '@/component/Toast';
import {actionVocabularyTask} from '/action/lVocabularyTaskAction'

class VocabularyTaskContainer extends Component {

    render() {

        alert("词汇任务");

        let {isTest} = this.props;

        return (
            <React.Fragment>
                <div> 词汇任务 </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isTest: state.vocabularyRedu.get('isTest'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionVocabularyTask, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyTaskContainer);