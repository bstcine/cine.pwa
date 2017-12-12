import React from 'react';
import {getParam, updateUrl, ignoreParams} from 'common/util/urlUtil'
import * as Service from '../service/index'
import * as storeUtil from 'common/util/storeUtil'
import {initWechat, setShareParam} from 'common/util/wechatUtil'
import {createShare, share, showShareMask, checkShareMask} from 'common/util/shareUtil'

export default class ReportList extends React.Component {
    constructor(props) {
        super(props)
        console.log('ReportList constructor')
        this.state = {
            list: [],
        }
        this.itemClick = this.itemClick.bind(this)
    }

    componentDidMount() {
        Service.queryContentWordResultList().then((res) => {
            if (res.except_case_desc) {
                alert(res.except_case_desc)
            }
            this.setState({
                list: res.result,
            })
        })
    }

    itemClick(id) {
        this.props.history.push(`/report?id=${id}`)
    }

    renderRecommendList() {
        return this.state.list.map((item, i) => {
            return (
                <tr key={item.id} onClick={(e)=>{this.itemClick(item.id,e)}}>
                    <td>{i + 1}</td>
                    <td>{item.create_at.substring(0, 10)}</td>
                    <td>{item.duration}</td>
                    <td>{item.vocab}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="report-list">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>测试时间</th>
                            <th>测试时长</th>
                            <th>词汇量</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderRecommendList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

