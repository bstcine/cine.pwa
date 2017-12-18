import React from 'react';
import * as storeUtil from '@/util/storeUtil'
import {initWechat} from '@/util/wechatUtil'

export default class UserInfo extends React.Component {

    constructor(props) {
        super(props)
        console.log('UserInfo constructor')
        this.curr_year = new Date().getFullYear()
        this.born_ats = ['2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001','2000','1999','1998','1997','1996','1995','1994','1993','1992','1991','1990','1989','1988','1987','1986','1985','1984','1983','1982','1981','1980','1979','1978','1977','1976','1975','1974','1973','1972','1971','1970','1969','1968','1967','1966','1965','1964','1963','1962','1961','1960','1959','1958','1957','1956','1955','1954','1953','1952','1951','1950','1949','1948','1947']
        this.grades = [{"label":"学龄前","value":0},{"label":"一年级","value":1},{"label":"二年级","value":2},{"label":"三年级","value":3},{"label":"四年级","value":4},{"label":"五年级","value":5},{"label":"六年级","value":6},{"label":"七年级","value":7},{"label":"八年级","value":8},{"label":"九年级","value":9},{"label":"十年级","value":10},{"label":"十一年级","value":11},{"label":"十二年级","value":12},{"label":"成人","value":13}]
        this.area_codes = [{"label":"北京市","value":110000},{"label":"天津市","value":120000},{"label":"河北省","value":130000},{"label":"山西省","value":140000},{"label":"内蒙古自治区","value":150000},{"label":"辽宁省","value":210000},{"label":"吉林省","value":220000},{"label":"黑龙江省","value":230000},{"label":"上海市","value":310000},{"label":"江苏省","value":320000},{"label":"浙江省","value":330000},{"label":"安徽省","value":340000},{"label":"福建省","value":350000},{"label":"江西省","value":360000},{"label":"山东省","value":370000},{"label":"河南省","value":410000},{"label":"湖北省","value":420000},{"label":"湖南省","value":430000},{"label":"广东省","value":440000},{"label":"广西壮族自治区","value":450000},{"label":"海南省","value":460000},{"label":"重庆市","value":500000},{"label":"四川省","value":510000},{"label":"贵州省","value":520000},{"label":"云南省","value":530000},{"label":"西藏自治区","value":540000},{"label":"陕西省","value":610000},{"label":"甘肃省","value":620000},{"label":"青海省","value":630000},{"label":"宁夏回族自治区","value":640000},{"label":"新疆维吾尔自治区","value":650000},{"label":"香港","value":810000},{"label":"澳门","value":820000},{"label":"台湾","value":710000},{"label":"其他","value":999999}]
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
            born_at:this.state.born_at,
            grade:this.state.grade,
            area_code:this.state.area_code,
        }
        if(!this.gradeConfirm()) return
        storeUtil.set('user', user)
        this.props.history.push(`/welcome`)
    }

    gradeConfirm() {
        const msg = '确定出生年份和年级填写正确？'
        if (this.state.grade <= 0) {// 学龄前
            if (this.curr_year - this.state.born_at >= 9) {
                return confirm(msg)
            }
        } else if (this.state.grade >=1 && this.state.grade <= 12) {// 校内年龄段
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
            if(user.born_at && this.born_ats.includes(user.born_at)){
                console.log(`born_at ${user.born_at}`)
                this.setState({born_at: user.born_at})
            }
            if(user.area_code && this.area_codes.some(item=>item.value=== user.area_code)){
                console.log(`area_code ${user.area_code}`)
                this.setState({area_code: user.area_code})
            }
            if(user.grade && this.grades.some(item=>item.value=== user.grade)){
                console.log(`grade ${user.grade}`)
                this.setState({grade: user.grade})
            }
        }
        initWechat()
    }

    bornAtChange(event){
        this.setState({born_at: event.target.value});
    }

    gradeChange(event){
        this.setState({grade: event.target.value});
    }

    areaCodeChange(event){
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
                                        return <option key={item} value={item}>{item+'年'}</option>
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