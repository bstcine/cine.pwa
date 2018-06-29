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
        actions.loadVocabulary(this.param.startIndex, this.param.endIndex, this.param.wordType);
    }

    render() {
        let { vocabularyList, actions } = this.props;

        return (
            <VocabularyTask
                vocabularyList={vocabularyList}
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
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(lWordAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    VocabularyTaskContainer
);
