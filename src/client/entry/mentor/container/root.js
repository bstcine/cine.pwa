import React from 'react';
import Entry from '@/component/Entry';
import { GLayoutContainer } from '@/g/container';
import * as h5 from '@/constant/menuItemUrl';

class Root extends Entry {
    componentDidMount() {
        if (location.pathname === h5.URL_Mentor_Index) location.href = h5.URL_Mentor_Student_Task;
    }

    render() {
        const { routes } = this.props;
        return <GLayoutContainer>{routes}</GLayoutContainer>;
    }
}

export default Root;
