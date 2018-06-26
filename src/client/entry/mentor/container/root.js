import React from 'react';
import Entry from '@/component/Entry';
import GLayout from '@/component/GLayout';

class Root extends Entry {
    render() {
        const { routes } = this.props;
        return <GLayout>{routes}</GLayout>;
    }
}

export default Root;
