import React, { Component } from 'react';
import * as Service from '@/service/quizvocab';
import storeUtil from '@/util/storeUtil';
import timeUtil from '@/util/timeUtil';

export default class ReportList extends Component {
    constructor(props) {
        super(props);
        console.log('ReportList constructor');
        this.state = {
            list: [],
        };
        this.itemClick = this.itemClick.bind(this);
        this.goStart = this.goStart.bind(this);
    }

    componentDidMount() {
        Service.queryContentWordResultList().then(res => {
            if (res.except_case_desc) {
                return alert(res.except_case_desc);
            }
            if (res.result && res.result.length) {
                this.setState({
                    list: res.result,
                });
            }
        });
    }

    itemClick(id) {
        this.props.history.push(`/report?id=${id}`);
    }

    goStart() {
        let url = '/';
        if (storeUtil.getToken()) {
            url = '/?token=' + storeUtil.getToken();
        }
        this.props.history.push(url);
    }

    renderList() {
        let { list } = this.state;
        if (!list.length) {
            return (
                <tr>
                    <td colSpan="4">没有数据，赶快测试吧</td>
                </tr>
            );
        } else {
            return list.map((item, i) => {
                return (
                    <tr
                        key={item.id}
                        onClick={e => {
                            this.itemClick(item.id, e);
                        }}>
                        <td>{i + 1}</td>
                        <td>
                            {item.create_at
                                ? item.create_at.substring(0, 10)
                                : '-'}
                        </td>
                        <td>{timeUtil.durationFormat(item.duration, 2)}</td>
                        <td>{item.vocab}</td>
                    </tr>
                );
            });
        }
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
                        <tbody>{this.renderList()}</tbody>
                    </table>
                    <div className="list-footer">
                        <button
                            onClick={this.goStart}
                            className="btn btn_sm btn_blue btn_try">
                            测试
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
