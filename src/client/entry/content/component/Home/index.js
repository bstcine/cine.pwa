import React, { Component } from 'react';
import { Tabs, TabItems, TabItem, TabPanels, TabPanel } from '@/component/Tabs';
import { getParam } from '@/util/_base/urlUtil';
import _ from 'lodash';
import Slider from './Slider';
import Notice from './Notice';
import TagFilter from './TagFilter';
import CategoryList from './CategoryList';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import uaUtil from '@/util/_base/uaUtil';
import Article from '@/entry/content/component/Home/Article';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import { fetchData } from '@/service/base';
import errorMsg from '@/util/errorMsg';
import { APIURL_Content_Home } from '@/../APIConfig';
import { CFloatingButton } from '@/component/_base';
import QRHelp from '@/component/QRHelp';
import LazyLoad from 'react-lazyload';
import TabBar from '@/component/TabBar';

const bottomImg1 = require('../../asset/image/book.jpg');
const bottomImg2 = require('../../asset/image/moon.jpg');
let bottomImg = Math.round(Math.random() * 10) % 2 ? bottomImg2 : bottomImg1;


const getSelectedTags = () => {
    let tags = [];
    let params = getParam();
    for (let [key, value] of Object.entries(params)) {
        if (/^tag_/i.test(key)) {
            tags.push({
                pid: parseInt(key.substring(4), 10),
                id: parseInt(value, 10),
            });
        }
    }
    return tags;
};
const formatCourseIds2Array = course_ids =>
    course_ids.split(',').map(obj => obj.replace(/\$/g, ''));

const formatData = tabs => {
    let subTagsByTabId = {};
    tabs.forEach(tab => {
        let subTags = [];
        tab.tags &&
            tab.tags.length &&
            tab.tags.forEach(pTag => {
                pTag.children &&
                    pTag.children.length &&
                    pTag.children.forEach(item => {
                        subTags.push(item);
                        if (
                            item.attributes &&
                            item.attributes.course_ids &&
                            item.attributes.course_ids.length
                        ) {
                            item.attributes.course_ids = formatCourseIds2Array(
                                item.attributes.course_ids
                            );
                        }
                    });
            });

        subTagsByTabId[tab.id] = subTags;
    });
    return { subTagsByTabId, tabs };
};

const needFilterCourse = (tab, subTagsByTabId, selectedTagIds) => {
    if (!selectedTagIds || !selectedTagIds.length) return false;
    let isNeedFilterCourse = false;
    let filterCourseIds = [];
    let subTags = subTagsByTabId[tab.id];
    subTags.forEach(tag => {
        if (selectedTagIds.includes(tag.id)) {
            isNeedFilterCourse = true;
            filterCourseIds = filterCourseIds.length
                ? _.intersection(filterCourseIds, tag.attributes.course_ids)
                : tag.attributes.course_ids;
        }
    });
    return { isNeedFilterCourse, filterCourseIds };
};

const tabWithFilterCourse = (tabs, subTagsByTabId, selectedTagIds) => {
    return tabs.map(tab => {
        let { isNeedFilterCourse, filterCourseIds } = needFilterCourse(
            tab,
            subTagsByTabId,
            selectedTagIds
        );
        if (isNeedFilterCourse) {
            let newTab = _.cloneDeep(tab);
            const newCategorys = [];
            newTab.categorys.forEach(item => {
                let newItem = { ...item };
                let courses = newItem.courses.filter(course =>
                    filterCourseIds.includes(course.id)
                );
                if (courses.length) {
                    newItem.courses = courses;
                    newCategorys.push(newItem);
                }
            });
            newTab.categorys = newCategorys;
            return newTab;
        } else {
            return tab;
        }
    });
};

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
        let { tabs, banners, notices, newsCategorys } = res;
        const selectedTags = getSelectedTags();
        const selectedTagIds = selectedTags.map(item => item.id);
        let { subTagsByTabId, tabs: formatedTabs } = formatData(tabs);
        this.subTagsByTabId = subTagsByTabId;
        this.formatedTabs = formatedTabs;
        let filteredTabs = tabWithFilterCourse(
            formatedTabs,
            subTagsByTabId,
            selectedTagIds
        );

        this.setState({
            banners,
            notices,
            newsCategorys,
            tabs: filteredTabs,
            selectedTags,
        });
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        const selectedTags = getSelectedTags();
        const selectedTagIds = selectedTags.map(item => item.id);
        let filteredTabs = tabWithFilterCourse(
            this.formatedTabs,
            this.subTagsByTabId,
            selectedTagIds
        );
        this.setState({
            tabs: filteredTabs,
            selectedTags,
        });
    }

    render() {
        console.log(`Home`);
        let { tabs, selectedTags } = this.state;
        return (
            <React.Fragment>
                <Header isShow={!interSiteCodeUtil.inAPP()} />

                <div className="container-fluid courses-container-bg">
                    <Slider banners={this.state.banners} />

                    <div className="container">
                        <Notice notices={this.state.notices} />
                    </div>

                    <div className="container courses-container">
                        <Tabs className="home-tabs" selectedId={getParam().tab}>
                            <TabItems>
                                {tabs.map(tab => {
                                    return (
                                        <TabItem
                                            key={tab.id}
                                            id={tab.id}
                                            style={{
                                                background: `url(${
                                                    tab.image
                                                }) center center / contain no-repeat`,
                                            }}
                                            activeStyle={{
                                                background: `url(${
                                                    tab.image_active
                                                }) center center / contain no-repeat`,
                                            }}
                                        >
                                            {tab.name}
                                        </TabItem>
                                    );
                                })}
                            </TabItems>
                            <TabPanels>
                                {tabs.map(tab => {
                                    return (
                                        <TabPanel key={tab.id} id={tab.id}>
                                            <TagFilter
                                                tags={tab.tags}
                                                history={this.props.history}
                                                selectedTags={selectedTags}
                                            />
                                            <CategoryList
                                                categorys={tab.categorys}
                                                history={this.props.history}
                                            />
                                        </TabPanel>
                                    );
                                })}
                            </TabPanels>
                        </Tabs>
                    </div>

                    <div className="container">
                        <Article newsCategorys={this.state.newsCategorys} />
                    </div>
                </div>

                <CFloatingButton
                    icon="ci-wechat"
                    color="secondary"
                    onClick={() => {
                        QRHelp.open();
                    }}
                >
                    课程咨询
                </CFloatingButton>

                {!interSiteCodeUtil.inAPP() && (
                    <LazyLoad offset={100} overflow={true}>
                        <div className="container-fluid">
                            <div
                                className="cine-slogan"
                                style={{
                                    background: `url(${bottomImg}) center center / cover no-repeat`,
                                }}
                            />
                        </div>
                    </LazyLoad>
                )}

                {!interSiteCodeUtil.inAPP() && <Footer isShow={true} />}
                {!(interSiteCodeUtil.inAPP() || interSiteCodeUtil.inAndroidH5()) && <TabBar />}
            </React.Fragment>
        );
    }
}
