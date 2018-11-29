import React from 'react';
import { CPanel, CCardContainer, CCard, CIcon } from '@/component/_base';
import QRHelp from '@/component/QRHelp';

const ResourceItem = ({ name, link, isMentor }) => {
    let helpMan = isMentor ? 'alice' : 'xzs';
    return (
        <CCard
            onClick={() => {
                QRHelp.open(helpMan);
            }}
        >
            <div className="cardResource">
                <div className="title">{name}</div>
                <CIcon className="resourceIcon">ci-download</CIcon>
            </div>
            <br />
        </CCard>
    );
};

const PResource = ({ resources, actions, isMentor }) => {
    let cardList = null;
    if (resources && resources.length > 0) {
        cardList = resources.map((item, index) => {
            if (item.visible === '0') {
                return null;
            }
            return (
                <ResourceItem key={index} name={item.title} link={item.link} isMentor={isMentor} />
            );
        });
    }

    return (
        <CPanel title="资料下载">
            <CCardContainer layout="111" gap="none">{cardList}</CCardContainer>
        </CPanel>
    );
};
export default PResource;
