// 访问本页 /learn/vocabularytask?task_id=
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wordAction } from '@/action/wordAction';
import WordList from '../component/WordList';
import { getParam } from '@/util/urlUtil';

class WordListContainer extends Component {

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
        actions.loadWordList(this.param);
    }

    render() {
        let { result, actions } = this.props;

        return (
            <WordList
                vocabularyList={result.rows}
                actions={actions}
                playAction={this.playAudio}
                param={this.param}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        result: state.WordRedu.get('result'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(wordAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    WordListContainer
);
