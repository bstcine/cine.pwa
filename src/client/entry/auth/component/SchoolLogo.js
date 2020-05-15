import React, { Component } from 'react';

class SchoolLogo extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="cine-auth__logo cine-auth__logo--school">
                <Logo data={data} />
            </div>
        );
    }
}

const Logo = ({ data }) => {
    if (data && data.logo_img) return <img src={data.logo_img} alt="logo" />;
    else if (data && data.name) return <span>{data.name}</span>;
    else return null;
};

export default SchoolLogo;
