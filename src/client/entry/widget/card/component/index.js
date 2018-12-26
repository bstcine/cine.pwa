import React from 'react';
import './../../asset/style/card.less';
import {
    CPanel,
    CDrawer,
    CButton,
    CIconButton,
    CWindow,
} from '@/component/_base';
import { SideBarCard } from '@/component/SideBar/CardLayout';
import CardExList from './CardList';
import uaUtil from '@/util/_base/uaUtil';

export default class CardDemo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isRightDrawerOpen: false,
            layout: '234',
        };
        this.onChange = this.onChange.bind(this);
        this.onOpenWindow = this.onOpenWindow.bind(this);
    }

    onChange(sb_value) {
        this.setState({
            layout: sb_value,
        });
    }
    onOpenWindow(key) {
        const offset = uaUtil.mobile()
            ? {
                  top: '10%',
                  bottom: '0px',
              }
            : {
                  top: '5%',
                  bottom: '10px',
                  left: '100px',
              };
        console.log('offset', offset);

        if (key === '0') {
            CWindow.open({
                offset,
                href: '/content/course?cid=42',
            });
        } else {
            CWindow.open({
                offset,
                children: (
                    <div>
                        <div className="www">
                            <p>标题：{key}</p>
                            <p>
                                金额：1234567890-=qwertyuiop[]\asdfghjkl;’zxcvbnm,./1234567890-=qwertyuiop[]\asdfghjkl;’zxcvbnm,./1234567890-=qwertyuiop[]\asdfghjkl;’zxcvbnm,./1234567890qwertyuiop[]\asdfghjkl;’zxcvbnm,./
                            </p>
                            <div className="w1" />
                            <div className="w2" />
                            <div className="w3" />
                            <div className="w4" />
                        </div>
                        <div className="w5" />
                    </div>
                ),
            });
        }
    }

    render() {
        const { orders, actions } = this.props;
        const orderlist = orders.toJS();
        // alert(JSON.stringify(orders));
        return (
            <React.Fragment>
                <SideBarCard
                    value={this.state.layout}
                    onChange={this.onChange}
                />

                {/* <CIcon>svg-arrow_back</CIcon> */}
                <CPanel
                    title="AIRBNB"
                    className="show-drawer"
                    ext={
                        <div>
                            <CIconButton
                                icon="svg-m-home"
                                onClick={() => {
                                    this.onOpenWindow('0');
                                }}
                            />
                            <CIconButton
                                icon="svg-m-dashboard"
                                onClick={() => {
                                    this.onOpenWindow('1');
                                }}
                            />
                            <CIconButton icon="svg-m-share" />
                            <CIconButton icon="svg-m-android" color="primary" />
                            <CIconButton
                                icon="svg-m-favorite"
                                color="secondary"
                            />
                        </div>
                    }
                >
                    <CDrawer
                        anchor="right"
                        className="vertical_content"
                        isOpen={this.state.isRightDrawerOpen}
                        onClose={() => {
                            this.setState({
                                isRightDrawerOpen: false,
                            });
                        }}
                    />
                    <CardExList
                        type="card"
                        orders={orderlist}
                        layout={this.state.layout}
                        actions={actions}
                        className={
                            this.state.layout === '111' ? 'bglight' : null
                        }
                    />
                    <br />
                    <br />
                    <CButton
                        size="small"
                        color="primary"
                        onClick={() => {
                            this.setState({
                                isRightDrawerOpen: true,
                            });
                        }}
                    >
                        更多...
                    </CButton>
                </CPanel>

                <br />
                <br />
                <br />
                <br />
                <br />

                <CardExList
                    orders={orderlist}
                    layout={this.state.layout === '123' ? '123' : '112'}
                />
            </React.Fragment>
        );
    }
}
