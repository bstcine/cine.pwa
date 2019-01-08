import React from 'react';
import Entry from '@/component/Entry';
import Layout from './../component/Layout';
import { getLastPath } from '@/util/_base/urlUtil';
import * as banner from '@/service/data/response_sp_banner.json';

class CSubRoot extends Entry {
    constructor(props) {
        super(props);
        let lastPath = getLastPath();
        if (
            lastPath !== 'zxss' &&
            lastPath !== 'tfsat' &&
            lastPath !== 'fjyd'
        ) {
            lastPath = 'zxss';
        }
        let bannerRes = banner['result'][lastPath];
        this.bannerImage = bannerRes[0]['img'];
        this.bannerLink = bannerRes[0]['link'];
    }
    render() {
        const { children } = this.props;
        return (
            <Layout imageUrl={this.bannerImage} link={this.bannerLink}>
                {children}
            </Layout>
        );
    }
}

export default CSubRoot;
