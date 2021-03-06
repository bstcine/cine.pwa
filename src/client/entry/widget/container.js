import React, { Component } from 'react';
import './asset/style/widget.less';
import {
    CButton,
    CIconButton,
    CPanel,
    CCardContainer,
    CFloatingButton,
    CDrawer,
    CCard,
    CIcon,
    CMessage,
    CAlert,
    CWindow,
    CModal,
} from '@/component/_base';
import Player from '@/component/Player';
import authUtil from '@/util/authUtil';
import QRHelp from '@/component/QRHelp';
import ShareMask from '@/component/ShareMask';
import Switch from '@/component/_base/Switch';
import { GLayoutContainer } from '@/g/container';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLeftDrawerOpen: false,
            isRightDrawerOpen: false,
            isTopDrawerOpen: false,
            isBottomDrawerOpen: false,
            isLeftFixedDrawerOpen: false,
            isBottomFixedDrawerOpen: false,
            switchChecked: false,
            isOpenModal: false,
        };
    }

    render() {
        const {
            isLeftDrawerOpen,
            isRightDrawerOpen,
            isTopDrawerOpen,
            isBottomDrawerOpen,
            isLeftFixedDrawerOpen,
            isBottomFixedDrawerOpen,
            switchChecked,

            isOpenModal,
        } = this.state;
        let player = new Audio();
        return (
            <GLayoutContainer>
                <div className="cine-widget">
                    <CPanel>
                        <CButton
                            onClick={() => {
                                player.src =
                                    'http://oss.bstcine.com/word/top10000/one_b.mp3';
                                player.play();
                            }}
                        >
                            播放MP3
                        </CButton>
                    </CPanel>

                    <CPanel>
                        <Switch
                            checked={switchChecked}
                            onChange={checked => {
                                this.setState({ switchChecked: checked });
                            }}
                        />

                        <span>
                            switch status :{' '}
                            {switchChecked ? 'checked' : 'uncheck'}
                        </span>
                    </CPanel>
                    <CPanel>
                        <CButton
                            onClick={() => {
                                ShareMask.open();
                            }}
                        >
                            ShareMask
                        </CButton>
                    </CPanel>
                    <CPanel>
                        <CButton
                            onClick={() => {
                                CWindow.open({
                                    children: 'CWindow.open();',
                                });
                            }}
                        >
                            window default
                        </CButton>

                        <CButton
                            onClick={() => {
                                CWindow.open({
                                    offset: {
                                        top: '100px',
                                        bottom: '5%',
                                        left: '150px',
                                    },
                                    children:
                                        'CWindow.open({\n' +
                                        '                                offset: {\n' +
                                        "                                    top: '100px',\n" +
                                        "                                    bottom: '5%',\n" +
                                        "                                    left: '150px',\n" +
                                        '                                },\n' +
                                        '                            });',
                                });
                            }}
                        >
                            window
                        </CButton>
                    </CPanel>

                    <CPanel>
                        <CButton
                            onClick={() => {
                                authUtil.login();
                            }}
                        >
                            登录
                        </CButton>

                        <CButton
                            onClick={() => {
                                QRHelp.open();
                            }}
                        >
                            QRHelp xzs
                        </CButton>

                        <CButton
                            onClick={() => {
                                QRHelp.open('nancy');
                            }}
                        >
                            QRHelp nancy
                        </CButton>

                        <CButton
                            onClick={() => {
                                QRHelp.open('alice');
                            }}
                        >
                            QRHelp alice
                        </CButton>
                    </CPanel>

                    <CFloatingButton>查看</CFloatingButton>

                    <CPanel
                        title="Player"
                        ext={
                            <CButton variant="outlined">
                                DEFAULT <CIcon>lock</CIcon>
                            </CButton>
                        }
                    >
                        <CFloatingButton icon="pets" color="primary">
                            开始
                        </CFloatingButton>
                        <CFloatingButton icon="pets" color="secondary" />
                        <Player src={this.loadMedia} />
                    </CPanel>
                    <CPanel title="CButton" className="widget_btn">
                        <div>
                            <CButton icon="home" />
                            <CButton
                                icon="ci-video"
                                color="primary"
                                onClick={() => {
                                    this.setState(prevState => ({
                                        isPDrawerOpen: !prevState.isPDrawerOpen,
                                    }));
                                }}
                            >
                                PanelDrawer
                            </CButton>
                            <CButton color="secondary">
                                SECONDARY<CIcon>ci-video</CIcon>
                            </CButton>
                            <CButton color="secondary">
                                SECONDARY svg<CIcon>svg-arrow_back</CIcon>
                            </CButton>
                            <CButton color="secondary" disabled>
                                DISABLED
                            </CButton>
                            <CButton href="//baidu.com">Link</CButton>
                            <CButton color="secondary" shape="capsule">
                                SECONDARY<CIcon>ci-video</CIcon>
                            </CButton>
                        </div>
                        <div>
                            <CButton variant="outlined">
                                DEFAULT <CIcon>lock</CIcon>
                            </CButton>
                            <CButton variant="outlined" color="primary">
                                PRIMARY
                            </CButton>
                            <CButton variant="outlined" color="secondary">
                                SECONDARY
                            </CButton>
                            <CButton
                                disabled
                                variant="outlined"
                                color="secondary"
                            >
                                DISABLED
                            </CButton>
                            <CButton variant="outlined" href="//baidu.com">
                                Link
                            </CButton>
                            <CButton
                                variant="outlined"
                                color="primary"
                                shape="capsule"
                            >
                                PRIMARY
                            </CButton>
                        </div>
                        <div>
                            <CButton size="small" color="primary">
                                SMALL
                            </CButton>
                            <CButton
                                size="small"
                                variant="outlined"
                                color="primary"
                            >
                                SMALL
                            </CButton>
                            <CButton
                                size="small"
                                variant="contained"
                                color="primary"
                            >
                                SMALL
                            </CButton>
                            <CButton
                                size="small"
                                variant="contained"
                                color="primary"
                                shape="capsule"
                            >
                                SMALL
                            </CButton>
                        </div>
                        <div>
                            <CButton variant="contained">DEFAULT</CButton>
                            <CButton variant="contained" color="primary">
                                PRIMARY
                                <CIcon>svg-loading</CIcon>
                            </CButton>
                            <CButton variant="contained" color="secondary">
                                SECONDARY<CIcon>lock</CIcon>
                            </CButton>
                            <CButton disabled variant="contained">
                                DISABLED
                            </CButton>
                            <CButton variant="contained" href="//baidu.com">
                                Link
                            </CButton>
                            <CButton variant="contained" shape="capsule">
                                DEFAULT
                            </CButton>
                        </div>

                        <div>
                            <CButton size="large" color="secondary">
                                LARGE
                            </CButton>
                            <CButton
                                size="large"
                                variant="outlined"
                                color="secondary"
                            >
                                LARGE<CIcon>play_circle_filled</CIcon>
                            </CButton>
                            <CButton
                                size="large"
                                variant="contained"
                                color="secondary"
                            >
                                LARGE
                            </CButton>
                            <CButton
                                size="large"
                                variant="contained"
                                color="secondary"
                                shape="capsule"
                            >
                                LARGE
                            </CButton>
                        </div>
                        <div>
                            <CIconButton icon="lock" size="small" />
                            <CIconButton icon="pets" color="primary" />
                            <CIconButton icon="home" color="secondary" />
                        </div>
                        <div>
                            <CButton block variant="contained" color="primary">
                                block NORMAL
                            </CButton>
                            <CButton
                                block
                                size="large"
                                variant="outlined"
                                color="secondary"
                            >
                                block LARGE
                            </CButton>
                        </div>

                        <div
                            style={{
                                background: 'rgba(0,0,0,0.2)',
                                padding: '10px',
                            }}
                        >
                            <CButton transparent>TRANSPARENT</CButton>
                            <CButton transparent size="large" color="primary">
                                TRANSPARENT
                            </CButton>
                            <CButton
                                icon="ci-video"
                                transparent
                                color="primary"
                            />
                        </div>
                    </CPanel>

                    <CPanel title="Gird Card default112 gap=large">
                        <CCardContainer gap="large" layout="112">
                            <CCard className="cbabsdf">1</CCard>
                            <CCard hover="darken" onClick={() => {}}>
                                2 hover=darken
                            </CCard>
                            <CCard hover="outlined" onClick={() => {}}>
                                3 hover=outlined
                            </CCard>
                            <CCard hover="lighten" onClick={() => {}}>
                                4 hover=lighten
                            </CCard>
                            <CCard>5</CCard>
                            <CCard>6</CCard>
                            <CCard>9</CCard>
                        </CCardContainer>
                    </CPanel>

                    <CPanel title="Gird Card 122 gap=small hover=lighten">
                        <CCardContainer gap="small" layout="122">
                            <CCard hover="opacity">1</CCard>
                            <CCard hover="opacity">2</CCard>
                            <CCard hover="opacity">3</CCard>
                            <CCard hover="opacity">4</CCard>
                            <CCard hover="opacity">5</CCard>
                            <CCard hover="opacity">6</CCard>
                            <CCard hover="opacity">7</CCard>
                        </CCardContainer>
                    </CPanel>

                    <CPanel title="Gird Card 123 gap=none">
                        <CCardContainer layout="123" slice={true}>
                            <CCard>1</CCard>
                            <CCard>2</CCard>
                            <CCard>3</CCard>
                            <CCard>4</CCard>
                            <CCard>5</CCard>
                            <CCard>6</CCard>
                        </CCardContainer>
                    </CPanel>
                    <CPanel title="Gird Card 234 gap=small">
                        <CCardContainer layout="234" slice={true}>
                            <CCard>1</CCard>
                            <CCard>2</CCard>
                            <CCard>3</CCard>
                            <CCard>4</CCard>
                            <CCard>5</CCard>
                            <CCard>6</CCard>
                            <CCard>7</CCard>
                            <CCard>8</CCard>
                            <CCard>9</CCard>
                        </CCardContainer>
                    </CPanel>
                    <CPanel title="Gird Card 234 gap=large">
                        <CCardContainer layout="245" slice={true}>
                            <CCard>1</CCard>
                            <CCard>2</CCard>
                            <CCard>3</CCard>
                            <CCard>4</CCard>
                            <CCard>5</CCard>
                            <CCard>6</CCard>
                            <CCard>7</CCard>
                        </CCardContainer>
                    </CPanel>

                    <CPanel>
                        <CCardContainer layout="345" slice={true}>
                            <CCard>1</CCard>
                            <CCard>2</CCard>
                            <CCard>3</CCard>
                            <CCard>4</CCard>
                            <CCard>5</CCard>
                            <CCard>6</CCard>
                            <CCard>7</CCard>
                            <CCard>8</CCard>
                            <CCard>9</CCard>
                            <CCard>10</CCard>
                            <CCard>11</CCard>
                            <CCard>12</CCard>
                            <CCard>13</CCard>
                            <CCard>14</CCard>
                        </CCardContainer>
                    </CPanel>

                    <CPanel title="line 1 step 2">
                        <CCardContainer layout="234" line="1" step="1">
                            <CCard>1</CCard>
                            <CCard>2</CCard>
                            <CCard>3</CCard>
                            <CCard>4</CCard>
                            <CCard>5</CCard>
                            <CCard>6</CCard>
                            <CCard>7</CCard>
                            <CCard>8</CCard>
                            <CCard>9</CCard>
                            <CCard>10</CCard>
                        </CCardContainer>
                    </CPanel>

                    <CPanel title="line 1 step 3">
                        <CCardContainer layout="234" line="1" step="3">
                            <CCard>1</CCard>
                            <CCard>2</CCard>
                            <CCard>3</CCard>
                            <CCard>4</CCard>
                            <CCard>5</CCard>
                            <CCard>6</CCard>
                            <CCard>7</CCard>
                            <CCard>8</CCard>
                            <CCard>9</CCard>
                            <CCard>10</CCard>
                            <CCard>11</CCard>
                            <CCard>12</CCard>
                            <CCard>13</CCard>
                            <CCard>14</CCard>
                            <CCard>15</CCard>
                            <CCard>15</CCard>
                            <CCard>16</CCard>
                            <CCard>17</CCard>
                            <CCard>18</CCard>
                            <CCard>19</CCard>
                            <CCard>20</CCard>
                        </CCardContainer>
                    </CPanel>

                    <CPanel title="modal">
                        <CButton
                            onClick={() => {
                                this.setState({ isOpenModal: true });
                            }}
                        >
                            Modal
                        </CButton>
                        <CModal
                            maskClosable
                            isOpen={isOpenModal}
                            close={() => {
                                console.log(111);
                                this.setState({ isOpenModal: false });
                            }}
                        >
                            <CPanel title="Alert">asdfdfad</CPanel>
                        </CModal>
                    </CPanel>

                    <CPanel title="Alert">
                        <CButton
                            shape="round"
                            color="secondary"
                            onClick={() => {
                                CAlert.open({
                                    text: 'hello alert!',
                                    maskClosable: true,
                                });
                            }}
                        >
                            <CIcon>pets</CIcon>
                        </CButton>

                        <CButton
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                CAlert.open({
                                    title: 'title',
                                    text: 'hello alert!with cancel',
                                    onConfirm: () => {
                                        console.log('confirm');
                                    },
                                    onCancel: () => {
                                        console.log('onCancel');
                                    },
                                });
                            }}
                        >
                            ALERT
                        </CButton>

                        <CButton
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                CAlert.open({
                                    title: 'title',
                                    text: 'hello alert!with cancel',
                                    onConfirm: () => {
                                        console.log('confirm');
                                    },
                                    onCancel: () => {
                                        console.log('onCancel');
                                    },
                                    responsive: true,
                                });
                            }}
                        >
                            responsive ALERT
                        </CButton>

                        <CButton
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                const loading = CMessage.loading();
                                setTimeout(() => {
                                    loading.close();
                                }, 2000);
                            }}
                        >
                            Loading
                        </CButton>
                        <CButton
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                CMessage.success('完成', () => {
                                    console.info('完成关闭了');
                                });
                            }}
                        >
                            success
                        </CButton>
                        <CButton
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                CMessage.error('Err! duration:0', 0);
                            }}
                        >
                            Error
                        </CButton>
                        <CButton
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                CMessage.info(
                                    '“长按屏幕”保存图片，分享图片到朋友圈“长按屏幕”保存图片，分享图片到朋友圈“长按屏幕”保存图片，分享图片到朋友圈“长按屏幕”保存图片，分享图片到朋友圈'
                                );
                            }}
                        >
                            Info
                        </CButton>

                        <CButton
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                CMessage.info('我在上面', {
                                    mask: false,
                                    position: 'top',
                                });
                            }}
                        >
                            TopInfo
                        </CButton>
                    </CPanel>

                    <CPanel title="Drawer" className="drawer_panel">
                        <div>
                            <CButton
                                onClick={() => {
                                    this.setState({
                                        isLeftDrawerOpen: true,
                                    });
                                }}
                            >
                                Open Left
                            </CButton>
                            <CButton
                                onClick={() => {
                                    this.setState({
                                        isRightDrawerOpen: true,
                                    });
                                }}
                            >
                                Open Right
                            </CButton>
                            <CButton
                                onClick={() => {
                                    this.setState({
                                        isTopDrawerOpen: true,
                                    });
                                }}
                            >
                                Open Top
                            </CButton>
                            <CButton
                                onClick={() => {
                                    this.setState({
                                        isBottomDrawerOpen: true,
                                    });
                                }}
                            >
                                Open Bottom
                            </CButton>
                        </div>

                        <div>
                            <CButton
                                onClick={() => {
                                    this.setState({
                                        isLeftFixedDrawerOpen: true,
                                    });
                                }}
                            >
                                Open Left Fullscreen
                            </CButton>

                            <CButton
                                onClick={() => {
                                    this.setState({
                                        isBottomFixedDrawerOpen: true,
                                    });
                                }}
                            >
                                Open Bottom Fullscreen
                            </CButton>
                        </div>

                        <CDrawer
                            isOpen={isLeftDrawerOpen}
                            onClose={() => {
                                this.setState({
                                    isLeftDrawerOpen: false,
                                });
                            }}
                        >
                            <div className="vertical_content">
                                <CButton block variant="contained">
                                    DEFAULT
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    color="primary"
                                >
                                    PRIMARY
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    color="secondary"
                                >
                                    SECONDARY<CIcon>lock</CIcon>
                                </CButton>
                                <CButton block disabled variant="contained">
                                    DISABLED
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    href="//baidu.com"
                                >
                                    Link
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    shape="capsule"
                                >
                                    DEFAULT
                                </CButton>
                            </div>
                        </CDrawer>
                        <CDrawer
                            anchor="right"
                            isOpen={isRightDrawerOpen}
                            onClose={() => {
                                this.setState({
                                    isRightDrawerOpen: false,
                                });
                            }}
                        >
                            <div className="vertical_content">
                                <CButton block variant="contained">
                                    DEFAULT
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    color="primary"
                                >
                                    PRIMARY
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    color="secondary"
                                >
                                    SECONDARY<CIcon>lock</CIcon>
                                </CButton>
                                <CButton block disabled variant="contained">
                                    DISABLED
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    href="//baidu.com"
                                >
                                    Link
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    shape="capsule"
                                >
                                    DEFAULT
                                </CButton>
                            </div>
                        </CDrawer>
                        <CDrawer
                            anchor="top"
                            isOpen={isTopDrawerOpen}
                            onClose={() => {
                                this.setState({
                                    isTopDrawerOpen: false,
                                });
                            }}
                        >
                            <div className="horizontal_content">
                                <CButton block variant="contained">
                                    DEFAULT
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    color="primary"
                                >
                                    PRIMARY
                                </CButton>

                                <CButton
                                    block
                                    variant="contained"
                                    shape="capsule"
                                >
                                    DEFAULT
                                </CButton>
                            </div>
                        </CDrawer>
                        <CDrawer
                            anchor="bottom"
                            isOpen={isBottomDrawerOpen}
                            onClose={() => {
                                this.setState({
                                    isBottomDrawerOpen: false,
                                });
                            }}
                        >
                            <div className="horizontal_content">
                                <CButton block variant="contained">
                                    DEFAULT
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    color="primary"
                                >
                                    PRIMARY
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    color="secondary"
                                >
                                    SECONDARY<CIcon>lock</CIcon>
                                </CButton>
                            </div>
                        </CDrawer>

                        <CDrawer
                            fullscreen
                            isOpen={isLeftFixedDrawerOpen}
                            onClose={() => {
                                this.setState({
                                    isLeftFixedDrawerOpen: false,
                                });
                            }}
                        >
                            <div className="vertical_content">
                                <CButton block variant="contained">
                                    DEFAULT
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    color="primary"
                                >
                                    PRIMARY
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    color="secondary"
                                >
                                    SECONDARY<CIcon>lock</CIcon>
                                </CButton>
                                <CButton block disabled variant="contained">
                                    DISABLED
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    href="//baidu.com"
                                >
                                    Link
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    shape="capsule"
                                >
                                    DEFAULT
                                </CButton>
                            </div>
                        </CDrawer>

                        <CDrawer
                            fullscreen
                            anchor="bottom"
                            isOpen={isBottomFixedDrawerOpen}
                            onClose={() => {
                                this.setState({
                                    isBottomFixedDrawerOpen: false,
                                });
                            }}
                        >
                            <div className="vertical_content">
                                <CButton block variant="contained">
                                    DEFAULT
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    color="primary"
                                >
                                    PRIMARY
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    color="secondary"
                                >
                                    SECONDARY<CIcon>lock</CIcon>
                                </CButton>
                                <CButton block disabled variant="contained">
                                    DISABLED
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    href="//baidu.com"
                                >
                                    Link
                                </CButton>
                                <CButton
                                    block
                                    variant="contained"
                                    shape="capsule"
                                >
                                    DEFAULT
                                </CButton>
                            </div>
                        </CDrawer>
                    </CPanel>
                </div>
            </GLayoutContainer>
        );
    }
}

export default Container;
