import React from 'react';
import Entry from '@/component/Entry';
import GLayout from '@/component/GLayout';
import * as h5 from '@/constant/menuItemUrl';

class Root extends Entry {
    componentDidMount() {
        if (location.pathname === h5.URL_Mentor_Index) location.href = h5.URL_Mentor_Student_Task;
    }

    render() {
        const { routes } = this.props;
        return <GLayout>{routes}</GLayout>;
    }
}

export default Root;
