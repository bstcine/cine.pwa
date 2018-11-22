import React, { Component } from 'react';
import { CConfirm } from '@/component/Auth';
import { getParam } from '@/util/urlUtil';
import { fetchData } from '@/service/base';
import { APIURL_Auth_Confirm } from '../../../../APIConfig';

class ConfirmPage extends Component {
    constructor(props) {
        super(props);
        this.onConfirm = this.onConfirm.bind(this);
        const { phone, head_image } = getParam();
        this.state = {
            head_image,
            phone,
        };
        this.onConfirm = this.onConfirm.bind(this);
    }

    async onConfirm() {
        const { code, redirect } = getParam();
        let [err] = await fetchData(APIURL_Auth_Confirm, { code });
        if (!err) location.href = decodeURIComponent(redirect);
    }

    render() {
        const { head_image, phone } = this.state;
        return (
            <div className="cine-auth__page">
                <div className="cine-auth__main">
                    <CConfirm
                        onConfirm={this.onConfirm}
                        head_image={head_image}
                        phone={phone}
                    />
                </div>
            </div>
        );
    }
}

export default ConfirmPage;
