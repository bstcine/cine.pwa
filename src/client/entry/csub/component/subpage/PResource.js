import React from 'react';
import { CPanel, CCardContainer, CCard, CIcon } from '@/component/_base';
import QRHelp from '@/component/QRHelp';

const ResourceItem = ({ name, link }) => {
    return (
        <CCard hover="none" onClick={()=>{
            QRHelp.open();
        }} >
            <div className="cardResource">
                <div className="resourceTitle">{name}</div>
                <CIcon className="resourceIcon">ci-download</CIcon>
            </div>
            <br/>
        </CCard>
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
            <CCardContainer layout='111'>
                {cardList}
            </CCardContainer>
        </CPanel>
    );
};
export default PResource;
