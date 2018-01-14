import React, {Component} from 'react';
import {getParam} from '@/util/urlUtil'
import * as area from '@/service/data/response_pca_code.json'
import * as Service from '@/service/user'
import Bridge from "@/util/bridge";
import siteCodeUtil from "@/util/sitecodeUtil";
import BRIDGE_EVENT from "@/constant/bridgeEvent";

export default class Index extends Component {

    constructor(props) {
        super(props);

        let param = getParam();
        this.state = {
            token: param.token,
            id: param.id,
            type: param.type,
            province: '',
            city: '',
            county: '',
            name: '',
            phone: '',
            address: ''
        };

        this.provinceArr = area.addressCodes;
        this.cityArr = [];
        this.countyArr = [];

        this.selectProvince = this.selectProvince.bind(this);
        this.selectCity = this.selectCity.bind(this);
        this.selectCounty = this.selectCounty.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (!this.state.id) return;

        Service.queryAddress(this.state)
            .then(result => {
                if (!result.msg) {
                    this.init(result.data);
                } else {
                    console.log(result.msg);
                    this.setState({id: ''});
                }
            });
    }

    init(item) {
        console.log(item);

        let province = item.province;
        let city = item.city;

        this.provinceArr.forEach((item) => {
            if (item.code == province) {
                this.cityArr = item.childs;
            }
        });

        this.cityArr.forEach((item) => {
            if (item.code == city) {
                this.countyArr = item.childs;
            }
        });

        this.setState({
            id: item.id,
            province: province,
            city: city,
            county: item.county,
            name: item.name,
            phone: item.phone,
            address: item.address
        });
    }

    selectProvince(event) {
        let province = event.target.value;
        this.setState({
            province: province,
            city: '',
            county: ''
        });

        this.provinceArr.forEach((item) => {
            if (item.code == province) {
                this.cityArr = item.childs;
            }
        })
    }

    selectCity(event) {
        let city = event.target.value;
        this.setState({
            city: city,
            county: ''
        });

        this.cityArr.forEach((item) => {
            if (item.code == city) {
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

    inputOnChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        //个人设置
        let isSet = this.state.type && this.state.type == "1";

        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.ADDRESS_SAVE, this.state);
        } else if (siteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.ADDRESS_SAVE, this.state);
        }

        Service.addAddress(this.state)
            .then(result => {
                if (isSet) {
                    if (!result.msg) return alert('保存成功');
                    alert('保存失败(' + result.msg + ')')
                }
            });
    }

    render() {
        return (
            <form className="mui-form mui-container-fluid" onSubmit={this.handleSubmit}>
                <legend>地址管理</legend>
                <div className="mui-select">
                    <select id="province" onChange={this.selectProvince} value={this.state.province} required>
                        <option key="">请选择</option>
                        {this.provinceArr.map(function (item) {
                            return <option key={item.code} value={item.code}>{item.name}</option>
                        })}
                    </select>
                    <label>省份</label>
                </div>
                <div className="mui-select">
                    <select id="city" onChange={this.selectCity} value={this.state.city} required>
                        <option key="">请选择</option>
                        {this.cityArr.map(function (item) {
                            return <option key={item.code} value={item.code}>{item.name}</option>
                        })}
                    </select>
                    <label>城市</label>
                </div>
                <div className="mui-select">
                    <select id="county" onChange={this.selectCounty} value={this.state.county} required>
                        <option key="">请选择</option>
                        {this.countyArr.map(function (item) {
                            return <option key={item.code} value={item.code}>{item.name}</option>
                        })}
                    </select>
                    <label>区／县</label>
                </div>
                <div className="mui-textfield">
                    <input type="text" id="name" name="name" onChange={this.inputOnChange} value={this.state.name}
                           required/>
                    <label>收货人：</label>
                </div>
                <div className="mui-textfield">
                    <input type="tel" id="phone" name="phone" onChange={this.inputOnChange} value={this.state.phone}
                           required/>
                    <label>联系方式:</label>
                </div>
                <div className="mui-textfield">
                    <textarea id="address" name="address" onChange={this.inputOnChange} value={this.state.address}
                              required/>
                    <label>详细地址</label>
                </div>
                <button type="submit" className="mui-btn mui-btn--raised">保存</button>
            </form>
        )
    }

}







