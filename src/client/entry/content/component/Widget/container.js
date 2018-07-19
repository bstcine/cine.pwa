import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GIcon from '@/component/GIcon';
import '../../asset/style/widget.less';
import {
    CButton,
    CPanel,
    CCardContainer,
    CCard,
    CIconButton,
    CFloatingBox,
} from '@/component/_base';
import gAction from '@/action/gAction';
import GLayout from '@/component/GLayout';

class Container extends Component {
    render() {
        const { gActions } = this.props;
        return (
            <GLayout>
                <CPanel title="CButton @seeat : entry/content/component/Widget.js">
                    <div>
                        <CButton>
                            <GIcon name="mi-home" /> DEFAULT
                        </CButton>
                        <CButton color="primary">PRIMARY</CButton>
                        <CButton color="secondary">SECONDARY</CButton>
                        <CButton disabled>DISABLED</CButton>
                        <CButton href="//baidu.com">Link</CButton>
                    </div>
                    <div>
                        <CButton variant="outlined">
                            DEFAULT <GIcon name="mi-lock" />
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
                            SECONDARY <GIcon name="mi-lock" />
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
                            LARGE <GIcon name="mi-play_circle_filled" />
                        </CButton>
                        <CButton
                            size="large"
                            variant="contained"
                            color="secondary">
                            LARGE2
                        </CButton>
                    </div>
                    <div>
                        <CIconButton>lock</CIconButton>
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
                </CPanel>
                <CPanel title="Gird Card default112 gap=large">
                    <CCardContainer gap="large">
                        <CCard className="cbabsdf">1</CCard>
                        <CCard hover="darken">2 hover=darken</CCard>
                        <CCard hover="outlined">3 hover=outlined</CCard>
                        <CCard hover="lighten">4 hover=lighten</CCard>
                        <CCard>5</CCard>
                        <CCard>6</CCard>
                        <CCard>7</CCard>
                    </CCardContainer>
                </CPanel>

                <CPanel title="Gird Card 122 gap=none hover=lighten">
                    <CCardContainer gap="none">
                        <CCard layout="122" hover="lighten">
                            1
                        </CCard>
                        <CCard layout="122" hover="lighten">
                            2
                        </CCard>
                        <CCard layout="122" hover="lighten">
                            3
                        </CCard>
                        <CCard layout="122" hover="lighten">
                            4
                        </CCard>
                        <CCard layout="122" hover="lighten">
                            5
                        </CCard>
                        <CCard layout="122" hover="lighten">
                            6
                        </CCard>
                        <CCard layout="122" hover="lighten">
                            7
                        </CCard>
                    </CCardContainer>
                </CPanel>

                <CPanel title="Gird Card 123">
                    <CCardContainer>
                        <CCard layout="123">1</CCard>
                        <CCard layout="123">2</CCard>
                        <CCard layout="123">3</CCard>
                        <CCard layout="123">4</CCard>
                        <CCard layout="123">5</CCard>
                        <CCard layout="123">6</CCard>
                    </CCardContainer>
                </CPanel>
                <CPanel title="Gird Card 234">
                    <CCardContainer>
                        <CCard layout="234">1</CCard>
                        <CCard layout="234">2</CCard>
                        <CCard layout="234">3</CCard>
                        <CCard layout="234">4</CCard>
                        <CCard layout="234">5</CCard>
                        <CCard layout="234">6</CCard>
                        <CCard layout="234">7</CCard>
                        <CCard layout="234">8</CCard>
                        <CCard layout="234">9</CCard>
                    </CCardContainer>
                </CPanel>
                <CPanel title="CFloatingBox">
                    <CCardContainer>
                        <CCard layout="234">1</CCard>
                        <CCard layout="234">2</CCard>
                        <CCard layout="234">3</CCard>
                        <CCard layout="234">4</CCard>
                        <CCard layout="234">5</CCard>
                        <CCard layout="234">6</CCard>
                        <CCard layout="234">7</CCard>
                    </CCardContainer>
                    <CFloatingBox>
                        <CButton variant="fab">
                            <GIcon name="mi-lock" />
                        </CButton>
                        <CButton variant="fab" color="primary">
                            <GIcon name="mi-alarm" />
                        </CButton>
                        <CButton variant="fab" mini color="secondary">
                            <GIcon name="mi-pets" />
                        </CButton>
                    </CFloatingBox>
                </CPanel>
                <CPanel title="Alert">
                    <CButton
                        variant="fab"
                        mini
                        color="secondary"
                        onClick={() => {
                            gActions.showAlert({ text: 'hello alert!' });
                        }}>
                        <GIcon name="mi-pets" />
                    </CButton>

                    <CButton
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            gActions.showAlert({
                                title: 'title',
                                text: 'hello alert!',
                                onConfirm: () => {
                                    console.log('confirm');
                                },
                            });
                        }}>
                        ALERT
                    </CButton>
                    <CButton
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            gActions.showLoading();
                            setTimeout(() => {
                                gActions.hideLoading();
                            }, 3000);
                        }}>
                        Loading
                    </CButton>
                    <CButton
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            gActions.showMessage({
                                text: 'hello Message!',
                            });
                        }}>
                        Message
                    </CButton>
                    <CButton
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            gActions.showMessage(
                                {
                                    error: 'Error! autohide:false',
                                },
                                false
                            );
                        }}>
                        Message Error
                    </CButton>
                </CPanel>
            </GLayout>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    gActions: bindActionCreators(gAction, dispatch),
});

export default connect(null, mapDispatchToProps)(Container);
