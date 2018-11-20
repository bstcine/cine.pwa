import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';

const ResourceList = ({ resources, actions }) => {
    return (
        <CCardContainer layout="122" gap="large">
            {resources.length}
        </CCardContainer>
    );
};
export default ResourceList;
