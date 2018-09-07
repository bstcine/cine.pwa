import React, { Component } from 'react';
import './asset/style/widget.less';
import {
    CButton,
    CPanel,
    CCardContainer,
    CDrawer,
    CCard,
    CIconButton,
    CFloatingBox,
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
            <div className="cine-widget">
                <CPanel title="Player">
                    <Player src={this.loadMedia} />
                </CPanel>
                <CPanel title="CButton">
                    <div>
                        <CButton>
                            <CIcon>home</CIcon>
                        </CButton>
                        <CButton
                            color="primary"
                            onClick={() => {
                                this.setState(prevState => ({
                                    isPDrawerOpen: !prevState.isPDrawerOpen,
                                }));
                            }}>
                            <CIcon>ci-ico_grammar</CIcon> PanelDrawer
                        </CButton>
                        <CButton color="secondary">
                            <CIcon>ci-ico_grammar</CIcon> SECONDARY
                        </CButton>
                        <CButton disabled>DISABLED</CButton>
                        <CButton href="//baidu.com">Link</CButton>
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
                    </div>
                    <div>
                        <CButton variant="contained">DEFAULT</CButton>
                        <CButton variant="contained" color="primary">
                            PRIMARY
                        </CButton>
                        <CButton variant="contained" color="secondary">
                            SECONDARY <CIcon>lock</CIcon>
                        </CButton>
                        <CButton disabled variant="contained">
                            DISABLED
                        </CButton>
                        <CButton variant="contained" href="//baidu.com">
                            Link
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
                    </div>
                    <div>
                        <CButton size="large" color="secondary">
                            LARGE
                        </CButton>
                        <CButton
                            size="large"
                            variant="outlined"
                            color="secondary">
                            LARGE <CIcon>play_circle_filled</CIcon>
                        </CButton>
                        <CButton
                            size="large"
                            variant="contained"
                            color="secondary">
                            LARGE2
                        </CButton>
                    </div>
                    <div>
                        <CIconButton className="w-my-lock">lock</CIconButton>
                        <CIconButton color="primary">alarm</CIconButton>
                        <CIconButton mini color="secondary">
                            pets
                        </CIconButton>
                    </div>
                    <div>
                        <CButton fullWidth variant="contained" color="primary">
                            FULLWIDTH NORMAL
                        </CButton>
                        <CButton
                            fullWidth
                            size="large"
                            variant="outlined"
                            color="secondary">
                            FULLWIDTH LARGE
                        </CButton>
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
                <CPanel title="CFloatingBox">
                    <CCardContainer layout="234">
                        <CCard>1</CCard>
                        <CCard>2</CCard>
                        <CCard>3</CCard>
                        <CCard>4</CCard>
                        <CCard>5</CCard>
                        <CCard>6</CCard>
                        <CCard>7</CCard>
                    </CCardContainer>
                    <CFloatingBox>
                        <CButton
                            variant="fab"
                            onClick={() => {
                                this.setState(prevState => ({
                                    isDrawerOpen: !prevState.isDrawerOpen,
                                }));
                            }}>
                            <CIcon>lock</CIcon>
                        </CButton>
                        <CButton variant="fab" color="primary">
                            <CIcon>ci-ico_grammar</CIcon>
                        </CButton>
                        <CButton variant="fab" mini color="secondary">
                            <CIcon>pets</CIcon>
                        </CButton>
                    </CFloatingBox>
                </CPanel>
                <CPanel title="Alert">
                    <CButton
                        variant="fab"
                        mini
                        color="secondary"
                        onClick={() => {
                            CModal.alert({ text: 'hello alert!' });
                        }}>
                        <CIcon>pets</CIcon>
                    </CButton>

                    <CButton
                        variant="outlined"
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
