import React, { Component } from 'react';
import WidgetDemo from '../component/demo';
import { GLayoutContainer } from '@/g/container';

class WidgetExampleContainer extends Component {
    render() {
        return (
            <GLayoutContainer>
                <WidgetDemo />
            </GLayoutContainer>
        );
    }
}

export default WidgetExampleContainer;
