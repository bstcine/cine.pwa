import React from 'react';
import Entry from '@/component/Entry';
import { GLayoutContainer } from '@/g/container';

class RootContainer extends Entry {
    render() {
        return <GLayoutContainer>{this.props.children}</GLayoutContainer>;
    }
}

export default RootContainer;
