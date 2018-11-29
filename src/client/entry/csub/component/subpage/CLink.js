import React from 'react';
import './../../asset/style/link.less';

const CLink = ({ text, href, target }) => {
    let link = (
        <a href={href} target="_blank">
            <div className="cLink">{text}</div>
        </a>
    );
    return link;
};

export default CLink;
