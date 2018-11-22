import React from 'react';
import { CPanel, CCardContainer, CCard } from '@/component/_base';

const PResource = ({ resources, actions }) => {
    return (
        <CPanel title="资料下载">
            <CCardContainer layout="122" gap="large">
                {resources.length}
                <br/>
                <br/>
                {`待Aaron调整"资料下载"UI`}

            </CCardContainer>
        </CPanel>
    );
};
export default PResource;
