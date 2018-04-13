import React, {Component} from 'react';

export default class Coupon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {coupon} = this.props;
        return (
            <div className="category">
                <div className="category-text">
                    <span className="text-blue">•</span> {coupon.name}
                    <span className="category-intro">{coupon.value}</span>
                </div>
            </div>
        );
    }
}
