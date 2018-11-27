import React from 'react';
import './../../asset/style/card.less';
import { CPanel, CDrawer, CButton } from '@/component/_base';
import { SideBarCard } from '@/component/SideBar/CardLayout';
import CardExList from './CardList';

export default class CardDemo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isRightDrawerOpen: false,
            layout: '234',
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(sb_value) {
        this.setState({
            layout: sb_value,
        });
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

                <CPanel title="AIRBNB" className="show-drawer">
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
                    layout={
                        this.state.layout === '123' ? '123' : "112"
                    }
                />
            </React.Fragment>
        );
    }
}
