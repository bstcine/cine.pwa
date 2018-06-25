import React from 'react';
import Entry from '@/component/Entry';
import GLayout from '@/component/GLayout';
import '../asset/style/index.less';

class LearnRoot extends Entry {
    render() {
        const { routes } = this.props;
        return <GLayout>{routes}</GLayout>;
    }
}

export default LearnRoot;
