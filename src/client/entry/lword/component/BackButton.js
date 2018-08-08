/**
 * Created by lidangkun on 2018/8/7.
 */
import React from 'react';
import '../asset/style/BackButton.less';

class BackButton extends React.PureComponent {
    render() {
        let { title } = this.props;
        return (
            <div className="back-Content">
                <img className="back-Image" src={require('@/asset/image/arrow_back.svg')} />
                <p className="back-Label">{title}</p>
            </div>
        );
    }
}

export default BackButton;