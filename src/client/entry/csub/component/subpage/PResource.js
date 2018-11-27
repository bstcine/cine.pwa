import React from 'react';
import { CPanel, CIcon } from '@/component/_base';
import QRHelp from '@/component/QRHelp';

const ResourceItem = ({ name, link }) => {
    return (
        <React.Fragment>
            <div className="cardResource">
                <div className="resourceTitle">{name}</div>
                <CIcon
                    className="resourceIcon"
                    onClick={()=>{
                        QRHelp.open();
                    }}
                >ci-download</CIcon>
            </div>
            <br/>
        </React.Fragment>
    );
};

const PResource = ({ resources, actions }) => {
    let cardList = null;
    if (resources && resources.length > 0) {
        cardList = resources.map((item, index) => {
            if (item.visible === '0') {
                return null;
            }
            return (
                <ResourceItem key={index} name={item.title} link={item.link}/>
            );
        });
    }

    return (
        <CPanel title="资料下载">
            {cardList}
        </CPanel>
    );
};
export default PResource;
