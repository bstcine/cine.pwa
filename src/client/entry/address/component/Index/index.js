import React, {Component} from 'react';
import {getParam} from '@/util/urlUtil'
import * as area from '@/service/data/response_pca_code.json'

export default class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            province: '-1',
            city: '-1',
            county: '-1',
        };

        this.provinceArr = area.addressCodes;
        this.cityArr = [];
        this.countyArr = [];

        this.selectProvince = this.selectProvince.bind(this);
        this.selectCity = this.selectCity.bind(this);
        this.selectCounty = this.selectCounty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    selectProvince(event) {
        let province = event.target.value;
        this.setState({
            province: province,
            city: '-1',
            county: '-1'
        });

        this.provinceArr.forEach((item) => {
            if (item.code == province) {
                console.log(item);
                this.cityArr = item.childs;
            }
        })
    }

    selectCity(event) {
        let city = event.target.value;
        this.setState({
            city: city,
            county: '-1'
        });

        this.cityArr.forEach((item) => {
            if (item.code == city) {
                console.log(item);
                this.countyArr = item.childs;
            }
        })
    }

    selectCounty(event) {
        let county = event.target.value;
        this.setState({
            county: county
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <form className="mui-form mui-container-fluid" onSubmit={this.handleSubmit}>
                <legend>地址管理</legend>
                <div className="mui-select">
                    <select id="province" onChange={this.selectProvince} value={this.state.province} required>
                        <option key={-1}>请选择</option>
                        {this.provinceArr.map(function (item) {
                            return <option key={item.code} value={item.code}>{item.name}</option>
                        })}
                    </select>
                    <label>省份</label>
                </div>
                <div className="mui-select">
                    <select id="city" onChange={this.selectCity} value={this.state.city} required>
                        <option key={-1}>请选择</option>
                        {this.cityArr.map(function (item) {
                            return <option key={item.code} value={item.code}>{item.name}</option>
                        })}
                    </select>
                    <label>城市</label>
                </div>
                <div className="mui-select">
                    <select id="county" onChange={this.selectCounty} value={this.state.county} required>
                        <option key={-1}>请选择</option>
                        {this.countyArr.map(function (item) {
                            return <option key={item.code} value={item.code}>{item.name}</option>
                        })}
                    </select>
                    <label>区／县</label>
                </div>
                <div className="mui-textfield">
                    <input type="text" required/>
                    <label>收货人：</label>
                </div>
                <div className="mui-textfield">
                    <input type="tel" required/>
                    <label>联系方式:</label>
                </div>
                <div className="mui-textfield">
                    <textarea required/>
                    <label>详细地址</label>
                </div>
                <button type="submit" className="mui-btn mui-btn--raised">保存</button>
            </form>
        )
    }

}







