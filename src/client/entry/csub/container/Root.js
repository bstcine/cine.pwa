import React from 'react';
import Entry from '@/component/Entry';
import Layout  from './../component/Layout';


class CSubRoot extends Entry {
    render() {
        const { routes } = this.props;
        return <Layout>{routes}</Layout>;
    }
}

export default CSubRoot;
