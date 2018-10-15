import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Achieve from '../component/achieve';
import * as learnAction from '@/action/learnAction';
import { getParam } from '@/util/urlUtil';
import { CMessage } from '@/component/_base';
import QRCode from '@/component/QRCode';
import siteCodeUtil from '@/util/sitecodeUtil';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';

const mapStateToProps = state => {
    const { taskShareRedu } = state;
    return { taskShareRedu };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(learnAction, dispatch),
});

class AchievePage extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            img: null,
        };
    }

    componentDidMount() {
        document.title = '学习打卡';
        this.props.actions.fetchTaskShare({ user_id: getParam().user_id });
    }

    componentDidUpdate(prevProps, prevState) {
        const ele = this.ref.current.ref.current;
        if (!prevProps.taskShareRedu && this.props.taskShareRedu) {
            html2canvas(ele, {
                useCORS: true,
            })
                .then(canvas => {
                    const base64Url = canvas.toDataURL();
                    if (siteCodeUtil.inIOSAPP()) {
                        Bridge.ios(BRIDGE_EVENT.SEND_IMG, {
                            encode: 'base64',
                            data: base64Url,
                        });
                    } else if (siteCodeUtil.inAndroidAPP()) {
                        Bridge.android(BRIDGE_EVENT.SEND_IMG, {
                            encode: 'base64',
                            data: base64Url,
                        });
                    } else {
                        this.setState({
                            img: base64Url,
                        });
                        CMessage.info(
                            '“长按屏幕”保存图片并分享至朋友圈',
                            5000,
                            {
                                mask: false,
                                position: 'top',
                            }
                        );
                    }
                })
                .catch(function(error) {
                    QRCode.open(window.location.href);
                });
        }
    }

    render() {
        const data = this.props.taskShareRedu;
        return <Achieve ref={this.ref} img={this.state.img} {...data} />;
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AchievePage)
);
