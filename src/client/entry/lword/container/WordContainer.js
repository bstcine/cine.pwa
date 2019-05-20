/**
 * Created by lidangkun on 2018/7/26.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wordAction } from '@/action/wordAction';
import Word from '../component/Word';
import { getParam, addParam } from '@/util/_base/urlUtil';
import { GLayoutContainer } from '@/g/container';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import Bridge from '@/util/_base/interBridge';
import { interEventEmitter } from '@/util/_base/interEventEmitter';

class WordContainer extends Component {
    constructor(props) {
        super(props);

        // 获取参数
        this.param = getParam();
        document.title = '词汇学习';
    }

    componentDidMount() {
        let { actions } = this.props;
        // 更新top10000阶段效果
        actions.updateCourseSelectIndex(this.param);
        // 获取词汇列表
        actions.loadWordList(this.param);

        interEventEmitter.on(BRIDGE_EVENT.Pageshow, () => {
            let { actions } = this.props;
            actions.updateCourseSelectIndex(this.param);
            actions.loadWordList(this.param);
        });
    }
    gotoTest() {
        let testHref = addParam('/lword/quiz', this.param);
        if (interSiteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.OPEN_BROWSER, {
                url: testHref,
                title: document.title,
            }).then(res => {
                console.log(res);
            });
        } else {
            location.href = testHref;
        }
    }
    gotoList() {
        let listHref = addParam('/lword/card', this.param);
        if (interSiteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.OPEN_BROWSER, {
                url: listHref,
                title: document.title,
            }).then(res => {
                console.log(res);
            });
        } else {
            location.href = listHref;
        }
    }

    render() {
        let { result, actions } = this.props;

        return (
            <GLayoutContainer>
                <Word
                    param={this.param}
                    result={result}
                    actions={actions}
                    quizAction={() => {
                        this.gotoTest();
                    }}
                    listAction={() => {
                        this.gotoList();
                    }}
                />
            </GLayoutContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(WordContainer);
