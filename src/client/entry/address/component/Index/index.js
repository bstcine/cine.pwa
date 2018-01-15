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
            id: '',
            province: '',
            city: '',
            county: '',
            provinceVal: '',
            cityVal: '',
            countyVal: '',
            name: '',
            phone: '',
            address: ''
        };

        //是否编辑
        this.isEdit = param.case && param.case == '1';

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
        if (this.isEdit) {
            Service.queryAddress(this.state)
                .then(result => {
                    if (!result.msg) {
                        this.init(result.data);
                    } else {
                        console.log(result.msg);
                        this.setState({id: ''});
                    }
                });
        } else {
            if (siteCodeUtil.inIOSAPP()) {
                Bridge.ios(BRIDGE_EVENT.ADDRESS_INIT_DATA).then(res => {
                    if (res && res.data) {
                        this.init(res.data);
                    }
                });
            } else if (siteCodeUtil.inAndroidAPP()) {
                Bridge.android(BRIDGE_EVENT.ADDRESS_INIT_DATA).then(res => {
                    if (res && res.data) {
                        this.init(res.data);
                    }
                });
            }
        }
    }

    init(item) {
        console.log(item);
        if (!item) return;

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

        let provinceVal = "";
        this.provinceArr.forEach((item) => {
            if (item.code == province) {
                this.cityArr = item.childs;
                provinceVal = item.name;
            }
        });

        this.setState({
            province: province,
            provinceVal: provinceVal,
            city: '',
            county: ''
        });
    }

    selectCity(event) {
        let city = event.target.value;

        let cityVal = "";
        this.cityArr.forEach((item) => {
            if (item.code == city) {
                this.countyArr = item.childs;
                cityVal = item.name;
            }
        });

        this.setState({
            city: city,
            cityVal: cityVal,
            county: ''
        });
    }

    selectCounty(event) {
        let county = event.target.value;

        let countyVal = "";
        this.countyArr.forEach((item) => {
            if (item.code == county) {
                countyVal = item.name;
            }
        });

        this.setState({
            county: county,
            countyVal: countyVal
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

        let area = this.state.provinceVal + "-" + this.state.cityVal + "-" + this.state.countyVal;
        this.setState({
            area : area
        });

        console.log(this.state);

        if (this.isEdit) {
            Service.addAddress(this.state)
                .then(result => {
                    if (!result.msg) {
                        if (siteCodeUtil.inIOSAPP()) {
                            Bridge.ios(BRIDGE_EVENT.ADDRESS_SAVE, this.state);
                        } else if (siteCodeUtil.inAndroidAPP()) {
                            Bridge.android(BRIDGE_EVENT.ADDRESS_SAVE, this.state);
                        } else {
                            alert('保存成功')
                        }
                    } else {
                        alert('保存失败(' + result.msg + ')')
                    }
                });
        }else {
            if (siteCodeUtil.inIOSAPP()) {
                Bridge.ios(BRIDGE_EVENT.ADDRESS_SAVE, this.state);
            } else if (siteCodeUtil.inAndroidAPP()) {
                Bridge.android(BRIDGE_EVENT.ADDRESS_SAVE, this.state);
            }
        }
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







