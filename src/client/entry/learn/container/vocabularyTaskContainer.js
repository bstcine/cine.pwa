// 访问本页 /learn/vocabularytask?task_id=
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from '@/component/Toast';
import { actionVocabularyTask } from '@/action/lVocabularyTaskAction';
import VocabularyTask from '../component/vocabularyTask';
import {getParam} from '@/util/urlUtil';

class VocabularyTaskContainer extends Component {

    componentDidMount() {

        // 获取参数
        let param = getParam();
        let taskId = param.task_id;
        if (taskId === undefined || taskId === "" || taskId === null){
            alert("未获取指定的任务id");
            return
        }
        let startIndex = param.start_index
        let endIndex = param.end_index
        let wordType = param.word_type

        // 准备访问
        let {actions} = this.props;
        actions.loadVocabulary(taskId,startIndex,endIndex,wordType);
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
