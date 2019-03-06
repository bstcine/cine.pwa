import React, { Component } from 'react';
import WidgetDemo from '../component/demo';
import RootContainer from "./_rootContainter";

class WidgetExampleContainer extends Component {
    render() {
        return (
            <RootContainer>
                <WidgetDemo />
            </RootContainer>
        );
    }
}

export default WidgetExampleContainer;
