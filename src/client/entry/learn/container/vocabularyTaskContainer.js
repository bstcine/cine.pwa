import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from '@/component/Toast';
import { actionVocabularyTask } from '@/action/lVocabularyTaskAction';
import VocabularyTask from '../component/vocabularyTask';

class VocabularyTaskContainer extends Component {

    componentDidMount() {
        let {actions} = this.props;
        actions.loadVocabulary();
    }

    render() {

        let {vocabularyList,actions} = this.props;

        return (
            <React.Fragment>
                <VocabularyTask vocabularyList={vocabularyList} actions={actions} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        vocabularyList: state.vocabularyRedu.get('vocabularyList'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionVocabularyTask, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    VocabularyTaskContainer
);
