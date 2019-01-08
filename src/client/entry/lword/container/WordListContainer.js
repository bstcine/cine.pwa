// 访问本页 /learn/vocabularytask?task_id=
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wordAction } from '@/action/wordAction';
import WordList from '../component/WordList';
import { getParam } from '@/util/_base/urlUtil';
import { GLayoutContainer } from '@/g/container';

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
        document.title = '列表式学习';
    }

    componentDidMount() {
        // 准备访问
        let { actions } = this.props;
        actions.loadWordList(this.param);
    }

    render() {
        let { result, currentRows, isShowAll, actions } = this.props;

        return (
            <GLayoutContainer>
                <WordList
                    vocabularyList={currentRows}
                    name={result.name}
                    isShowAll={isShowAll}
                    actions={actions}
                    playAction={this.playAudio}
                    param={this.param}
                />
            </GLayoutContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        result: state.WordRedu.get('result'),
        isShowAll: state.WordRedu.get('isShowAll'),
        currentRows: state.WordRedu.get('currentRows'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(wordAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordListContainer);
