import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as Service from '@/service/content';
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs';
import {getParam} from '@/util/urlUtil';
import HomeHeader from './HomeHeader';
import _ from 'lodash';
import BannerSlider from './BannerSlider';
import GlobalNotice from './GlobalNotice';
import TagFilter from './TagFilter';
import CategoryList from './CategoryList';
import {initWechat} from '@/util/wechatUtil';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            tagTree0: [],
            tagTree1: [],
            categorys0: [],
            categorys1: [],
            tagids: []
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
        console.log(`componentDidMount`);
        initWechat();
        window.addEventListener('scroll', this.handlerScroll);
        let params = getParam();
        let tagids = [];
        for (let [key, value] of Object.entries(params)) {
            if (/^tag_/i.test(key)) {
                tagids.push(value);
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
        const {categorys0, categorys1} = Home.categoryConverter(this.categorys, courseIds0, courseIds1);
        this.setState({
            banners: homeRes.banners,
            tagTree0: homeRes.tags.tagTree0,
            tagTree1: homeRes.tags.tagTree1,
            categorys0: categorys0,
            categorys1: categorys1,
            tagids
        });
    }

    matchCourseIds(tagids) {
        let courseIds0 = null;
        let courseIds1 = null;
        tagids.forEach(tag_id => {
            const tag = this.tagsCache[tag_id];
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
        categorys.forEach(category => {
            if (category.children && category.children.length) {
                let children0 = [];
                let children1 = [];
                category.children.forEach(course => {
                    if (course.object_type === '1' || course.object_type === '4') {
                        if (filterIds0 && !filterIds0.includes(course.id)) return;
                        children0.push(course);
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
            }
        });
        return {categorys0, categorys1};
    }

    async componentWillReceiveProps(nextProps) {
        let params = getParam();
        let tagids = [];
        for (let [key, value] of Object.entries(params)) {
            if (/^tag_/i.test(key)) {
                tagids.push(value);
            }
        }
        let {courseIds0, courseIds1} = this.matchCourseIds(tagids);
        const {categorys0, categorys1} = Home.categoryConverter(this.categorys, courseIds0, courseIds1);
        this.setState({
            tagids,
            categorys0,
            categorys1
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handlerScroll);
    }

    render() {
        console.log(`Home`);
        return (
            <div className="home-container" ref="homeContainer">
                <HomeHeader ref="header" />
                <BannerSlider banners={this.state.banners} />
                <GlobalNotice />
                <Tabs className="home-tabs">
                    <TabItems>
                        <TabItem>视频课程</TabItem>
                        <TabItem>教材教辅</TabItem>
                    </TabItems>
                    <TabPanels>
                        <TabPanel>
                            <TagFilter
                                tags={this.state.tagTree0}
                                history={this.props.history}
                                tagids={this.state.tagids}
                            />
                            <CategoryList categorys={this.state.categorys0} history={this.props.history} />
                        </TabPanel>
                        <TabPanel>
                            <TagFilter
                                tags={this.state.tagTree1}
                                history={this.props.history}
                                tagids={this.state.tagids}
                            />
                            <CategoryList categorys={this.state.categorys1} history={this.props.history} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>



                <div className="article-wrap">
                    <div className="title"><i className="i-ball"></i>善恩精彩文章</div>
                    <div className="article-category-wrap">

                        <div className="article-category">
                            <div className="article-category-title">
                                善恩态度
                                <a className="more" href="/news-17">更多 &gt;</a>
                            </div>
                            <div className="article-img" style={{background: 'url(http://www.bstcine.com/f/2016/06/24/165403303SrFpFVF.jpg) no-repeat center',backgroundSize: 'cover'}}/>
                            <ul className="article-list">

                                <li className="article"><a href="/news/302">英文比中文好，所以我骄傲？</a></li>

                                <li className="article"><a href="/news/292">话题 | 寒门再难出贵子，是公平还是不幸？</a></li>

                                <li className="article"><a href="/news/177">深度分析：哈佛向功利主义开炮背后的原因</a></li>

                                <li className="article"><a href="/news/207">致那位毕业了却还没融入的伯克利学生的妈妈 —让我来告诉你问题出在哪里</a></li>

                            </ul>
                        </div>

                        <div className="article-category">
                            <div className="article-category-title">
                                留学专辑
                                <a className="more" href="/news-25">更多 &gt;</a>
                            </div>
                            <div className="article-img" style={{background: 'url(http://www.bstcine.com/f/2016/06/24/165403303SrFpFVF.jpg) no-repeat center',backgroundSize: 'cover'}}/>
                            <ul className="article-list">

                                <li className="article"><a href="/news/301">善恩留学之旅：波士顿大学</a></li>

                                <li className="article"><a href="/news/175">CAAS（联盟）真的要颠覆美国大学申请的游戏规则吗？看CA和CAAS怎么互掐</a></li>

                                <li className="article"><a href="/news/300">善恩留学之旅 | 爱默生学院</a></li>

                                <li className="article"><a href="/news/176">诚信，和善良一样，也是一种选择</a></li>

                            </ul>
                        </div>

                        <div className="article-category">
                            <div className="article-category-title">
                                英语学习
                                <a className="more" href="/news-13">更多 &gt;</a>
                            </div>
                            <div className="article-img" style={{background: 'url(http://www.bstcine.com/f/2016/06/24/165403303SrFpFVF.jpg) no-repeat center',backgroundSize: 'cover'}}/>
                            <ul className="article-list">

                                <li className="article"><a href="/news/294">从没上过听力课，托福听力满分 | 我家孩子的“磨耳朵”秘诀</a></li>

                                <li className="article"><a href="/news/289">这一本书，我们已经读了两年</a></li>

                                <li className="article"><a href="/news/90">从小学到高中，这么阅读，孩子们的英文可以接近母语水平。</a></li>

                                <li className="article"><a href="/news/296">哈佛耶鲁太远，不如效仿隔壁女孩的英语开挂之路</a></li>

                            </ul>
                        </div>

                        <div className="article-category">
                            <div className="article-category-title">
                                线上课程
                                <a className="more" href="/news-15">更多 &gt;</a>
                            </div>
                            <div className="article-img" style={{background: 'url(http://www.bstcine.com/f/2016/06/24/165403303SrFpFVF.jpg) no-repeat center',backgroundSize: 'cover'}}/>
                            <ul className="article-list">

                                <li className="article"><a href="/news/191">七步阅读法—善恩视频课程的使用方法</a></li>

                                <li className="article"><a href="/news/192">在线视频课程那些事儿</a></li>

                                <li className="article"><a href="/news/213">查理和巧克力工厂，了不起的盖茨比，血字的研究 视频课程发布，在线视频学习系统全面升级</a></li>

                            </ul>
                        </div>

                        <div className="article-category">
                            <div className="article-category-title">
                                名著精读
                                <a className="more" href="/news-26">更多 &gt;</a>
                            </div>
                            <div className="article-img" style={{background: 'url(http://www.bstcine.com/f/2016/06/24/165403303SrFpFVF.jpg) no-repeat center',backgroundSize: 'cover'}}/>
                            <ul className="article-list">

                                <li className="article"><a href="/news/304">速读的秘诀在哪里？</a></li>

                                <li className="article"><a href="/news/303">善恩精读 | 畅销百万册的普利策奖得主：Guns, Germs and Steel枪炮、病菌与钢铁</a></li>

                                <li className="article"><a href="/news/297">善恩精读 | Lord of the Flies 蝇王 ——又见反乌托</a></li>

                                <li className="article"><a href="/news/299">精读赏析 | 神探福尔摩斯不知道日心说？</a></li>

                            </ul>
                        </div>

                        <div className="article-category">
                            <div className="article-category-title">
                                应试攻略
                                <a className="more" href="/news-27">更多 &gt;</a>
                            </div>
                            <div className="article-img" style={{background: 'url(http://www.bstcine.com/f/2016/06/24/165403303SrFpFVF.jpg) no-repeat center',backgroundSize: 'cover'}}/>
                            <ul className="article-list">

                                <li className="article"><a href="/news/298">江苏高考英语，你就这样把学生和老师带歪 | 善恩专家团逐一评点江苏省2017年英语高考试题</a></li>

                            </ul>
                        </div>

                    </div>
                </div>

                <div className="bottom-banner"/>
            </div>
        );
    }
}
