import React, {Component} from 'react';
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs/index';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import {actionUserPoint} from "@/action/userAction";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {grey400, indigo500, indigo700} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class PointContainer extends Component {

    componentDidMount() {
        this.props.actions.loadUserPoint()
    }

    render() {
        let {points} = this.props;

        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: indigo500,
                primary2Color: indigo700,
                primary3Color: grey400,
            },
        });

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <React.Fragment>
                    <Tabs className={'coupon-tabs'}>
                        <TabItems>
                            <TabItem>积分明细</TabItem>
                            <TabItem>积分规则</TabItem>
                        </TabItems>
                        <TabPanels>
                            <TabPanel>
                                <Table height={'8rem'}>
                                    <TableHeader displaySelectAll={false}
                                                 adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>积分</TableHeaderColumn>
                                            <TableHeaderColumn>积分明细</TableHeaderColumn>
                                            <TableHeaderColumn>积分时间</TableHeaderColumn>
                                            <TableHeaderColumn>备注</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        {points.rows.map(item => {
                                            return <TableRow key={item.id}>
                                                <TableRowColumn>{item.value}</TableRowColumn>
                                                <TableRowColumn>{item.action_text}</TableRowColumn>
                                                <TableRowColumn>{item.create_at}</TableRowColumn>
                                                <TableRowColumn>{item.remark}</TableRowColumn>
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                            </TabPanel>
                            <TabPanel>
                                <div dangerouslySetInnerHTML={{__html:points.remark}}></div>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => ({
    points: state.points
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserPoint, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PointContainer)