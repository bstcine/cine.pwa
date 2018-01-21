import React, {Component} from 'react';
import {getParam} from '@/util/urlUtil'
import * as area from '@/service/data/response_pca_code.json'
import * as Service from '@/service/user'
import Bridge from "@/util/bridge";
import siteCodeUtil from "@/util/sitecodeUtil";
import BRIDGE_EVENT from "@/constant/bridgeEvent";

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
            area: '',
            name: '',
            phone: '',
            address: '',
            provinceVal: '',
            cityVal: '',
            countyVal: ''
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
        let county = item.county;
        let provinceVal = "";
        let cityVal = "";
        let countyVal = "";

        this.provinceArr.forEach((item) => {
            if (item.code == province) {
                this.cityArr = item.childs;
                provinceVal = item.name;
            }
        });

        this.cityArr.forEach((item) => {
            if (item.code == city) {
                this.countyArr = item.childs;
                cityVal = item.name;
            }
        });

        this.countyArr.forEach((item) => {
            if (item.code == county) {
                countyVal = item.name;
            }
        });

        this.setState({
            id: item.id,
            province: province,
            city: city,
            county: item.county,
            name: item.name,
            phone: item.phone,
            address: item.address,
            provinceVal: provinceVal,
            cityVal: cityVal,
            countyVal: countyVal
        });
    }

    selectProvince(event, index, value) {
        let province = value;

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
            county: '',
        });

        //如果只有一个二级选择，则默认选择
        if (this.cityArr.length == 1) {
            this.selectCity(null, 0, this.cityArr[0].code)
        }
    }

    selectCity(event, index, value) {
        let city = value;

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
            county: '',
        });
    }

    selectCounty(event, index, value) {
        let county = value;

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

        if (name == 'phone' && isNaN(value)) return;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.name || this.state.name.length < 2) {
            alert("收货人姓名至少2个字符");
            return
        }

        if (!this.state.phone || this.state.phone.length <= 0) {
            alert("请填写联系电话");
            return
        }

        if (!(this.state.province && this.state.city && this.state.county)) {
            alert("请选择所在地区");
            return
        }

        if (!this.state.address || this.state.address.length <= 0) {
            alert("请填写详细地址");
            return
        }

        if (this.state.address.length < 5) {
            alert("详细地址不得少于5个字符");
            return
        }

        if (this.state.address.length > 60) {
            alert("详细地址不能超过 60 个字符");
            return
        }

        if (!/^1[0-9]{10}$/.test(this.state.phone)) {
            alert("请输入有效的手机号码");
            return;
        }

        this.state.area = this.state.provinceVal + "-" + this.state.cityVal + "-" + this.state.countyVal;
        console.log(1, this.state);

        if (this.isEdit) {
            Service.addAddress(this.state)
                .then(result => {
                    if (!result.msg) {
                        if (siteCodeUtil.inIOSAPP()) {
                            Bridge.ios(BRIDGE_EVENT.ADDRESS_SAVE, this.state);
                        } else if (siteCodeUtil.inAndroidAPP()) {
                            Bridge.android(BRIDGE_EVENT.ADDRESS_SAVE, this.state);
                        } else {
                            location.href = decodeURIComponent(getParam().redirect)
                        }
                    } else {
                        alert('保存失败(' + result.msg + ')')
                    }
                });
        } else {
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
                <TextField
                    id="name"
                    name="name"
                    floatingLabelText="收货人："
                    fullWidth={true}
                    maxLength="30"
                    onChange={this.inputOnChange}
                    value={this.state.name}
                />
                <TextField
                    id="phone"
                    name="phone"
                    floatingLabelText="联系电话："
                    fullWidth={true}
                    maxLength="11"
                    type="tel"
                    onChange={this.inputOnChange}
                    value={this.state.phone}
                />
                <SelectField
                    id="province"
                    floatingLabelText="省份："
                    fullWidth={true}
                    onChange={this.selectProvince}
                    value={this.state.province}>
                    {this.provinceArr.map(function (item) {
                        return <MenuItem key={item.code} value={item.code} primaryText={item.name}/>
                    })}
                </SelectField>
                <SelectField
                    id="city"
                    floatingLabelText="城市："
                    fullWidth={true}
                    onChange={this.selectCity}
                    value={this.state.city}
                    disabled={!this.state.province || this.state.province.length <= 0}>
                    {this.cityArr.map(function (item) {
                        return <MenuItem key={item.code} value={item.code} primaryText={item.name}/>
                    })}
                </SelectField>
                <SelectField
                    id="county"
                    floatingLabelText="区／县："
                    fullWidth={true}
                    onChange={this.selectCounty}
                    value={this.state.county}
                    disabled={!this.state.city || this.state.city.length <= 0}>
                    {this.countyArr.map(function (item) {
                        return <MenuItem key={item.code} value={item.code} primaryText={item.name}/>
                    })}
                </SelectField>
                <TextField
                    id="address"
                    name="address"
                    floatingLabelText="详细地址："
                    fullWidth={true}
                    multiLine={true}
                    maxLength="60"
                    rows={2}
                    rowsMax={3}
                    onChange={this.inputOnChange}
                    value={this.state.address}
                />
                <button type="submit" className="btn-action btn-save">保存</button>
            </form>
        )
    }

}







