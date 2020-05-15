import React, { Component } from 'react';
import { getParam } from '@/util/_base/urlUtil';
import _ from 'lodash';
import CategoryList from '../Home/CategoryList';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import uaUtil from '@/util/_base/uaUtil';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import { fetchData } from '@/service/base';
import errorMsg from '@/util/errorMsg';
import { APIURL_Content_Home } from '@/../APIConfig';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            notices: [],
            newsCategorys: [],
            tabs: [],
            selectedTagIds: [],
        };
    }

    async componentDidMount() {
        console.log('componentDidMount');
        document.title = uaUtil.wechat()
            ? '善恩英语'
            : '善恩英语 - 卓越的在线英语课程、英文原版‎阅读、托福SAT备考';

        let [err, res] = await fetchData(APIURL_Content_Home);
        if (err) return alert(errorMsg(err));
        let { tabs } = res;
        let categorys = [];
        tabs.forEach(tab => {
            tab.categorys.forEach(category => {
                const listeningCourses = category.courses.filter(
                    o => o.object_type === '4'
                );
                if (listeningCourses.length) {
                    categorys = [...categorys, category];
                }
            });
        });

        console.log('categorys===>', categorys);

        this.setState({
            categorys,
        });
    }

    render() {
        console.log(`Listening`);
        let { categorys } = this.state;
        return (
            <React.Fragment>
                <Header isShow={!interSiteCodeUtil.inAPP()} />

                <div className="container-fluid courses-container-bg">
                    <div className="container courses-container">
                        <CategoryList
                            categorys={categorys}
                            history={this.props.history}
                        />
                    </div>
                </div>

                {!interSiteCodeUtil.inAPP() && <Footer isShow={true} />}
            </React.Fragment>
        );
    }
}
