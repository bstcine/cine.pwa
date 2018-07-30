import React from 'react';
import Entry from '@/component/Entry';
import { GLayoutContainer } from '@/g/container';

class WordRoot extends Entry {
    render() {
        const { routes } = this.props;
        return <GLayoutContainer>{routes}</GLayoutContainer>;
    }
}

export default WordRoot;
