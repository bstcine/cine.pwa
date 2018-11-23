import React, { Component } from 'react';
import { CConfirm } from '@/component/Auth';
import { getParam } from '@/util/urlUtil';

class ConfirmPage extends Component {
    constructor(props) {
        super(props);
        const { phone, head_image } = getParam();
        this.state = {
            head_image,
            phone,
        };
    }


    render() {
        const { head_image, phone } = this.state;
        return (
            <div className="cine-auth__page">
                <div className="cine-auth__main">
                    <CConfirm
                        head_image={head_image}
                        phone={phone}
                    />
                </div>
            </div>
        );
    }
}

export default ConfirmPage;
