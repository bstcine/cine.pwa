import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as Service from '@/service/content';
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs';
import {getParam} from '@/util/urlUtil';
import HomeHeader from './HomeHeader';
import _ from 'lodash';
import Slider from './Slider';
import Notice from './Notice';
import TagFilter from './TagFilter';
import CategoryList from './CategoryList';
import {initWechat} from '@/util/wechatUtil';
import siteCodeUtil from '@/util/sitecodeUtil';
import uaUtil from '@/util/uaUtil';
import Article from '@/entry/content/component/Home/Article';
import Header from '@/component/Header';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            tagTree0: [],
            tagTree1: [],
            categorys0: [],
            categorys1: [],
            categorys2: [],
            tagids: [],
            notices: [],
            newsCategorys: []
        };
        this.handlerScroll = this.handlerScroll.bind(this);
    }

    handlerScroll() {
        let header = ReactDOM.findDOMNode(this.refs.header);
        let home = ReactDOM.findDOMNode(this.refs.homeContainer);
        let homeOffset = home.getBoundingClientRect();
        if (homeOffset.top < 0) {
            if (!header.classList.contains('white-header')) header.classList.add('white-header');
        } else {
            if (header.classList.contains('white-header')) header.classList.remove('white-header');
        }
    }

    async componentDidMount() {
        console.log('componentDidMount');
        if (uaUtil.wechat()) {
            document.title = '善恩英语';
        } else {
            document.title = '善恩英语 - 卓越的在线英语课程、英文原版‎阅读、托福SAT备考';
        }

        initWechat();
        //window.addEventListener('scroll', this.handlerScroll);
        let params = getParam();
        let tagids = [];
        for (let [key, value] of Object.entries(params)) {
            if (/^tag_/i.test(key)) {
                tagids.push({
                    pid: key.substring(4),
                    id: value
                });
            }
        }
        let homeRes = await Service.getContentHome({token: null});
        this.tagsCache = {};
        _.compact(
            _.flatten([
                ...homeRes.tags.tagTree0.map(item => item.children),
                ...homeRes.tags.tagTree1.map(item => item.children)
            ])
        ).forEach(item => {
            if (item.attributes && item.attributes.course_ids && item.attributes.course_ids.length) {
                item.attributes.course_ids = item.attributes.course_ids.split(',').map(obj => obj.replace(/\$/g, ''));
            }
            this.tagsCache[item.id] = item;
        });

        this.categorys = homeRes.categorys.slice();

        let {courseIds0, courseIds1} = this.matchCourseIds(tagids);
        const {categorys0, categorys1, categorys2} = Home.categoryConverter(this.categorys, courseIds0, courseIds1);
        this.setState({
            banners: homeRes.banners,
            tagTree0: homeRes.tags.tagTree0,
            tagTree1: homeRes.tags.tagTree1,
            categorys0,
            categorys1,
            categorys2,
            tagids,
            notices: homeRes.notices,
            newsCategorys: homeRes.newsCategorys
        });
    }

    async componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        let params = getParam();
        let tagids = [];
        for (let [key, value] of Object.entries(params)) {
            if (/^tag_/i.test(key)) {
                tagids.push({
                    pid: key.substring(4),
                    id: value
                });
            }
        }
        let {courseIds0, courseIds1} = this.matchCourseIds(tagids);
        const {categorys0, categorys1, categorys2} = Home.categoryConverter(this.categorys, courseIds0, courseIds1);
        this.setState({
            tagids,
            categorys0,
            categorys1,
            categorys2
        });
    }

    matchCourseIds(tagids) {
        let courseIds0 = null;
        let courseIds1 = null;
        tagids.forEach(item => {
            const tag = this.tagsCache[item.id];
            if (tag.attributes && tag.attributes.course_ids && tag.attributes.course_ids.length) {
                if (tag.attributes.type === '1') {
                    courseIds0 = courseIds0
                        ? _.intersection(tag.attributes.course_ids, courseIds0)
                        : tag.attributes.course_ids;
                } else {
                    courseIds1 = courseIds1
                        ? _.intersection(tag.attributes.course_ids, courseIds1)
                        : tag.attributes.course_ids;
                }
            }
        });
        return {courseIds0, courseIds1};
    }

    static categoryConverter(categorys, filterIds0, filterIds1) {
        //视频课程
        let categorys0 = [];
        //教材教辅
        let categorys1 = [];
        //在线小班
        let categorys2 = [];
        categorys.forEach(category => {
            if (category.children && category.children.length) {
                let children0 = [];
                let children1 = [];
                let children2 = [];
                category.children.forEach(course => {
                    if (course.object_type === '1' || course.object_type === '4') {
                        if (filterIds0 && !filterIds0.includes(course.id)) return;
                        children0.push(course);
                    } else if (course.object_type === '5') {
                        children2.push(course);
                    } else {
                        if (filterIds1 && !filterIds1.includes(course.id)) return;
                        children1.push(course);
                    }
                });
                if (children0.length) {
                    let category0 = Object.assign({}, category);
                    category0.children = children0;
                    categorys0.push(category0);
                }
                if (children1.length) {
                    let category1 = Object.assign({}, category);
                    category1.children = children1;
                    categorys1.push(category1);
                }
                if (children2.length) {
                    let category2 = Object.assign({}, category);
                    category2.children = children2;
                    categorys2.push(category2);
                }
            }
        });
        return {categorys0, categorys1, categorys2};
    }

    componentWillUnmount() {
        //window.removeEventListener('scroll', this.handlerScroll);
    }

    render() {
        console.log(`Home`);
        console.log(`this.state.banners ${this.state.banners.length}`);
        return (
            <React.Fragment>
                <Header isShow={!siteCodeUtil.inAPP()} />
                <div className="container-fluid courses-container-bg" ref="homeContainer">
                    <Slider banners={this.state.banners} />

                    <div className="container">
                        <Notice notices={this.state.notices} />
                    </div>

                    <div className="container courses-container">
                        <Tabs className="home-tabs" selectedId={getParam().tab}>
                            <TabItems>
                                <TabItem id={'1'}>视频课程</TabItem>
                                <TabItem id={'2'}>教材教辅</TabItem>
                                <TabItem id={'3'}>在线小班</TabItem>
                            </TabItems>
                            <TabPanels>
                                <TabPanel id={'1'}>
                                    <TagFilter
                                        tags={this.state.tagTree0}
                                        history={this.props.history}
                                        tagids={this.state.tagids}
                                    />
                                    <CategoryList categorys={this.state.categorys0} history={this.props.history} />
                                </TabPanel>
                                <TabPanel id={'2'}>
                                    <TagFilter
                                        tags={this.state.tagTree1}
                                        history={this.props.history}
                                        tagids={this.state.tagids}
                                    />
                                    <CategoryList categorys={this.state.categorys1} history={this.props.history} />
                                </TabPanel>
                                <TabPanel id={'3'}>
                                    <CategoryList categorys={this.state.categorys2} history={this.props.history} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>

                    <div className="container">
                        <Article newsCategorys={this.state.newsCategorys} />
                    </div>
                </div>

                {!siteCodeUtil.inAPP() && !uaUtil.wechat() ? (
                    <div className="container-fluid">
                        <div className="cine-slogan" />
                    </div>
                ) : null}
            </React.Fragment>
        );
    }
}
