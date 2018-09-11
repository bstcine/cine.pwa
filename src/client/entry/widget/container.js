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

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = { isDrawerOpen: false, isPDrawerOpen: false };
    }

    render() {
        const { isDrawerOpen, isPDrawerOpen } = this.state;
        return (
            <div className="cine-widget widget_btn">
                <CFloatingButton
                    onClick={() => {
                        this.setState(prevState => ({
                            isDrawerOpen: !prevState.isDrawerOpen,
                        }));
                    }}>
                    查看
                </CFloatingButton>

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
                            }}>
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
                            shape="capsule">
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
                            color="primary">
                            SMALL
                        </CButton>
                        <CButton
                            size="small"
                            variant="contained"
                            color="primary">
                            SMALL
                        </CButton>
                        <CButton
                            size="small"
                            variant="contained"
                            color="primary"
                            shape="capsule">
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
                            color="secondary">
                            LARGE<CIcon>play_circle_filled</CIcon>
                        </CButton>
                        <CButton
                            size="large"
                            variant="contained"
                            color="secondary">
                            LARGE
                        </CButton>
                        <CButton
                            size="large"
                            variant="contained"
                            color="secondary"
                            shape="capsule">
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
                            color="secondary">
                            block LARGE
                        </CButton>
                    </div>

                    <div
                        style={{
                            background: 'rgba(0,0,0,0.2)',
                            padding: '10px',
                        }}>
                        <CButton transparent>TRANSPARENT</CButton>
                        <CButton transparent size="large" color="primary">
                            TRANSPARENT
                        </CButton>
                        <CButton icon="ci-video" transparent color="primary" />
                    </div>
                    <CDrawer
                        isOpen={isPDrawerOpen}
                        offset="50%"
                        onClose={() => {
                            this.setState({
                                isPDrawerOpen: false,
                            });
                        }}>
                        1231adfadfadfafd232
                    </CDrawer>
                </CPanel>

                <CPanel title="Gird Card default112 gap=large">
                    <CCardContainer gap="large" layout="112">
                        <CCard className="cbabsdf">1</CCard>
                        <CCard hover="darken">2 hover=darken</CCard>
                        <CCard hover="outlined">3 hover=outlined</CCard>
                        <CCard hover="lighten">4 hover=lighten</CCard>
                        <CCard>5</CCard>
                        <CCard>6</CCard>
                        <CCard>9</CCard>
                        <CDrawer
                            isOpen={isDrawerOpen}
                            onClose={() => {
                                this.setState({
                                    isDrawerOpen: false,
                                });
                            }}>
                            1231232
                        </CDrawer>
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
                <CPanel title="Alert">
                    <CButton
                        shape="round"
                        color="secondary"
                        onClick={() => {
                            CModal.alert({ text: 'hello alert!' });
                        }}>
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
                        }}>
                        ALERT
                    </CButton>
                    <CButton
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            const loading = CMessage.loading();
                            setTimeout(() => {
                                loading.close();
                            }, 2000);
                        }}>
                        Loading
                    </CButton>
                    <CButton
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            CMessage.success('完不成', () => {
                                console.success('完不成关闭了');
                            });
                        }}>
                        Info
                    </CButton>
                    <CButton
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            CMessage.error('Err! duration:0', 0);
                        }}>
                        Error
                    </CButton>
                </CPanel>
            </div>
        );
    }
}

export default Container;
