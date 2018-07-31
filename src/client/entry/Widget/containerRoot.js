import React from 'react';
import Entry from '@/component/Entry';
import { GLayoutContainer } from '@/g/container';

class Root extends Entry {
    render() {
        const { routes } = this.props;
        return <GLayoutContainer>{routes}</GLayoutContainer>;
    }
}

export default Root;