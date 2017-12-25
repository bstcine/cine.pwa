import React, {Component} from 'react';
import * as storeUtil from '@/util/storeUtil'
import {initWechat} from '@/util/wechatUtil'
import * as area from '@/service/data/response_area.json'
import * as account from '@/service/data/response_account.json'

export default class UserInfo extends Component {

    constructor(props) {
        super(props)
        console.log('UserInfo constructor')
        this.curr_year = new Date().getFullYear()
        this.born_ats = account.born_ats
        this.grades = account.grades
        this.area_codes = area.areaCodes
        this.state = {
            born_at: 2004,
            grade: 6,
            area_code: "310000",
        }
        this.startClick = this.startClick.bind(this)
        this.bornAtChange = this.bornAtChange.bind(this)
        this.gradeChange = this.gradeChange.bind(this)
        this.areaCodeChange = this.areaCodeChange.bind(this)
    }

    startClick() {
        let user = {
            born_at: this.state.born_at,
            grade: this.state.grade,
            area_code: this.state.area_code,
        }
        if (!this.gradeConfirm()) return
        storeUtil.set('user', user)
        this.props.history.push(`/welcome`)
    }

    gradeConfirm() {
        const msg = '确定出生年份和年级填写正确？'
        if (this.state.grade <= 0) {// 学龄前
            if (this.curr_year - this.state.born_at >= 9) {
                return confirm(msg)
            }
        } else if (this.state.grade >= 1 && this.state.grade <= 12) {// 校内年龄段
            if (this.state.grade < this.curr_year - this.state.born_at - 8 || this.state.grade > this.curr_year - this.state.born_at - 3) {
                return confirm(msg)
            }
        } else {// 成人段
            if (this.curr_year - this.state.born_at <= 15) {
                return confirm(msg)
            }
        }
        return true
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        console.log('componentDidMount')
        let user = storeUtil.get('user');
        if (user) {
            console.log(user)
            if (user.born_at && this.born_ats.includes(user.born_at)) {
                console.log(`born_at ${user.born_at}`)
                this.setState({born_at: user.born_at})
            }
            if (user.area_code && this.area_codes.some(item => item.value === user.area_code)) {
                console.log(`area_code ${user.area_code}`)
                this.setState({area_code: user.area_code})
            }
            if (user.grade && this.grades.some(item => item.value === user.grade)) {
                console.log(`grade ${user.grade}`)
                this.setState({grade: user.grade})
            }
        }
        initWechat()
    }

    bornAtChange(event) {
        this.setState({born_at: event.target.value});
    }

    gradeChange(event) {
        this.setState({grade: event.target.value});
    }

    areaCodeChange(event) {
        this.setState({area_code: event.target.value});
    }

    render() {
        return (
            <div className="wrapper mini">
                <div className="user-info">
                    <div className="title">测一下，看看你的词汇量有多少？</div>
                    <div className="tips">为保证本测试的学术参考价值，请补充如下个人信息</div>
                    <div className="form">
                        <div className="form-item">
                            <div className="form-label">
                                你的出生年份
                            </div>
                            <div className="form-control">
                                <select value={this.state.born_at} onChange={this.bornAtChange}>
                                    {this.born_ats.map(function (item) {
                                        return <option key={item} value={item}>{item + '年'}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="form-label">
                                你的年级
                            </div>
                            <div className="form-control">
                                <select value={this.state.grade} onChange={this.gradeChange}>
                                    {this.grades.map(function (item) {
                                        return <option key={item.value} value={item.value}>{item.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="form-item">
                            <div className="form-label">
                                你所在的地区
                            </div>
                            <div className="form-control">
                                <select value={this.state.area_code} onChange={this.areaCodeChange}>
                                    {this.area_codes.map(function (item) {
                                        return <option key={item.value} value={item.value}>{item.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>


                    <button className="btn btn_blue" onClick={this.startClick}>下一步</button>
                </div>
                <div className="footer mini"></div>
            </div>
        )
    }
}