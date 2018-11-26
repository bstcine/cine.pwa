import React from 'react';
import Entry from '@/component/Entry';
import Layout  from './../component/Layout';
import { getLastPath } from '@/util/urlUtil';
import * as banner from '@/service/data/response_sp_banner.json';

class CSubRoot extends Entry {
    constructor(props) {
        super(props);
        let lastPath = getLastPath();
        let bannerRes = banner['result'][lastPath];
        if (!bannerRes) {
            bannerRes = banner['result']['zxss']
        }
        this.bannerImage = bannerRes[0]['img'];
        this.bannerLink = bannerRes[0]['link'];
    }
    render() {
        const { routes } = this.props;
        return <Layout
                   imageUrl={this.bannerImage}
                   link={this.bannerLink}
               >{routes}</Layout>;
    }
}

export default CSubRoot;
