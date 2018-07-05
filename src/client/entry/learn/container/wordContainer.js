// 访问本页 /learn/vocabularytask?task_id=
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lWordAction } from '@/action/lWordAction';
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
        // 获取参数
        this.param = getParam();
    }

    componentDidMount() {
        // 准备访问
        let { actions } = this.props;
        actions.loadVocabulary(this.param);
    }

    render() {
        let { vocabularyList, taskStatus, actions } = this.props;

        return (
            <VocabularyTask
                vocabularyList={vocabularyList}
                taskStatus={taskStatus}
                actions={actions}
                playAction={this.playAudio}
                param={this.param}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        vocabularyList: state.WordRedu.get('vocabularyList'),
        taskStatus: state.WordRedu.get('taskStatus'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(lWordAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    VocabularyTaskContainer
);
