// 访问本页 /learn/vocabularytask?task_id=
import GLayout from '@/component/GLayout';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from '@/component/Toast';
import { actionVocabularyTask } from '@/action/lVocabularyTaskAction';
import VocabularyTask from '../component/vocabularyTask';
import { getParam } from '@/util/urlUtil';

class VocabularyTaskContainer extends Component {
    playAudio = audioSrc => {
        this.audioPlayer.src =
            'http://oss.bstcine.com/word/top10000/' + audioSrc;
        this.audioPlayer.play();
    };

    constructor(props) {
        super(props);

        this.audioPlayer = new Audio();
    }

    componentDidMount() {
        // 获取参数
        let param = getParam();

        let startIndex = param.start_index;
        let endIndex = param.end_index;
        let wordType = param.word_type;

        // 准备访问
        let { actions } = this.props;
        actions.loadVocabulary(startIndex, endIndex, wordType);
    }

    render() {
        let { vocabularyList, actions } = this.props;

        return (
            <VocabularyTask
                vocabularyList={vocabularyList}
                actions={actions}
                playAction={this.playAudio}
            />
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
