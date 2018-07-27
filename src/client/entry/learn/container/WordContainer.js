/**
 * Created by lidangkun on 2018/7/26.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lWordAction } from '@/action/lWordAction';
import Word from '../component/Word';
import { getParam } from '@/util/urlUtil';

class WordContainer extends Component {

    constructor(props) {
        super(props);

        // 获取参数
        this.param = getParam();
    }

    componentDidMount() {
        // 准备访问
        let { actions } = this.props;
        actions.loadWordList(this.param);
    }

    render() {
        let { word } = this.props
        return (
            <Word word={word} />
        );
    }
}

const mapStateToProps = state => {
    return {
        word: state.WordRedu.get('word'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(lWordAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    WordContainer
);