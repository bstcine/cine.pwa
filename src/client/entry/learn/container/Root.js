import React from 'react';
import Entry from '@/component/Entry';
import { GLayoutContainer } from '@/g/container';
import '../asset/style/index.less';

class LearnRoot extends Entry {
    render() {
        const { routes } = this.props;
        return <GLayoutContainer>{routes}</GLayoutContainer>;
    }
}

export default LearnRoot;
