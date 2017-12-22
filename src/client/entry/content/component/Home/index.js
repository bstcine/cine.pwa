import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import * as Service from '@/service/content'
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs'
import {getParam} from "@/util/urlUtil";
import Header from '@/component/Header'
import _ from 'lodash'
import BannerSlider from './BannerSlider'
import GlobalNotice from './GlobalNotice'
import TagFilter from './TagFilter'
import CategoryList from './CategoryList'


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            banners: [],
            tags: [],
            categorys: [],
            tagids: []
        }
        this.handlerScroll = this.handlerScroll.bind(this);
        this.debounceHandlerScroll = _.debounce(this.handlerScroll, 50);
    }

    handlerScroll() {
        let header = ReactDOM.findDOMNode(this.refs.header)
        let home = ReactDOM.findDOMNode(this.refs.homeContainer)
        let homeOffset = home.getBoundingClientRect()
        if (homeOffset.y < 0) {
            if (!header.classList.contains('white-header'))
                header.classList.add('white-header')
        } else {
            if (header.classList.contains('white-header'))
                header.classList.remove('white-header')
        }
    }

    async componentDidMount() {
        console.log(`componentDidMount`)
        window.addEventListener('scroll', this.debounceHandlerScroll)
        let params = getParam()
        let tagids = []
        for (let [key, value] of Object.entries(params)) {
            if (/^tag_/i.test(key)) {
                tagids.push(value)
            }
        }
        let homeRes = await Service.getContentHome({tagids})
        this.setState({
            banners: homeRes.banners,
            tags: homeRes.tags,
            categorys: homeRes.categorys,
            tagids
        })


    }

    async componentWillReceiveProps(nextProps) {
        let params = getParam()
        let tagids = []
        for (let [key, value] of Object.entries(params)) {
            if (/^tag_/i.test(key)) {
                tagids.push(value)
            }
        }
        this.setState({
            tagids
        })
        let homeRes = await Service.getContentHome({tagids})
        this.setState({
            categorys: homeRes.categorys,
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.debounceHandlerScroll)
    }

    render() {
        console.log(`Home`)
        return (
            <div className="home-container" ref="homeContainer">
                <Header ref="header"/>
                <BannerSlider banners={this.state.banners}/>
                <GlobalNotice/>
                <Tabs className="home-tabs">
                    <TabItems>
                        <TabItem>视频课程</TabItem>
                        <TabItem>教材教辅</TabItem>
                    </TabItems>
                    <TabPanels>
                        <TabPanel>
                            <TagFilter tags={this.state.tags} history={this.props.history} tagids={this.state.tagids}/>
                            <CategoryList categorys={this.state.categorys} history={this.props.history}/>
                        </TabPanel>
                        <TabPanel>222</TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        )
    }
}