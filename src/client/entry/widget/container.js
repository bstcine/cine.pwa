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
    CModal,
} from '@/component/_base';
import Player from '@/component/Player';
import CLoginModal from "@/component/CLoginModal";

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
        } = this.state;
        return (
            <div className="cine-widget widget_btn">
                <CFloatingButton>查看</CFloatingButton>

                <CPanel title="Player">
                    <CFloatingButton icon="pets" color="primary">
                        开始
                    </CFloatingButton>
                    <CFloatingButton icon="pets" color="secondary" />
                    <Player src={this.loadMedia} />
                </CPanel>
                <CPanel title="CButton">
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
                        <CButton disabled>DISABLED</CButton>
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
                        <CButton disabled variant="outlined">
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
                        <CButton icon="ci-video" transparent color="primary" />
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
                        <CCard hover="lighten">1</CCard>
                        <CCard hover="lighten">2</CCard>
                        <CCard hover="lighten">3</CCard>
                        <CCard hover="lighten">4</CCard>
                        <CCard hover="lighten">5</CCard>
                        <CCard hover="lighten">6</CCard>
                        <CCard hover="lighten">7</CCard>
                    </CCardContainer>
                </CPanel>

                <CPanel title="Gird Card 123 gap=none">
                    <CCardContainer layout="123" gap="none">
                        <CCard>1</CCard>
                        <CCard>2</CCard>
                        <CCard>3</CCard>
                        <CCard>4</CCard>
                        <CCard>5</CCard>
                        <CCard>6</CCard>
                    </CCardContainer>
                </CPanel>
                <CPanel title="Gird Card 234">
                    <CCardContainer layout="234">
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
                <CPanel>
                    <CCardContainer layout="234">
                        <CCard>1</CCard>
                        <CCard>2</CCard>
                        <CCard>3</CCard>
                        <CCard>4</CCard>
                        <CCard>5</CCard>
                        <CCard>6</CCard>
                        <CCard>7</CCard>
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

                <CPanel title="Alert">
                    <CButton
                        shape="round"
                        color="secondary"
                        onClick={() => {
                            CModal.alert({ text: 'hello alert!' });
                        }}
                    >
                        <CIcon>pets</CIcon>
                    </CButton>

                    <CButton
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            CModal.alert({
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
                            CModal.alert({
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
                                console.success('完成关闭了');
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
                                '“长按屏幕”保存图片，分享图片到朋友圈'
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
                            <CButton block variant="contained" color="primary">
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
                            <CButton block variant="contained" shape="capsule">
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
                            <CButton block variant="contained" color="primary">
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
                            <CButton block variant="contained" shape="capsule">
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
                            <CButton block variant="contained" color="primary">
                                PRIMARY
                            </CButton>

                            <CButton block variant="contained" shape="capsule">
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
                            <CButton block variant="contained" color="primary">
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
                            <CButton block variant="contained" color="primary">
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
                            <CButton block variant="contained" shape="capsule">
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
                            <CButton block variant="contained" color="primary">
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
                            <CButton block variant="contained" shape="capsule">
                                DEFAULT
                            </CButton>
                        </div>
                    </CDrawer>
                </CPanel>

                <CPanel>
                    <CButton onClick={()=>{
                        CLoginModal.open()
                    }}>登录</CButton>

                </CPanel>
            </div>
        );
    }
}

export default Container;
