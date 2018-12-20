import React from 'react';
import { CPanel, CCardContainer, CWindow } from "@/component/_base";
import { CourseList, TeacherList } from '@/component/CardItem';
import { SideBarSubPage } from '@/component/SideBar/SubPage';
import wechatUtil from '@/util/_base/wechatUtil';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import Bridge from '@/util/_base/interBridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import uaUtil from '@/util/_base/uaUtil';

export default class SubPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sbValue: 'course',
        };

        this.onChangeFromSB = this.onChangeFromSB.bind(this);
    }

    onChangeFromSB(sb_value) {
        switch (sb_value) {
            case 'course':
                this.wechatShare();
                break;
            case 'teacher':
                this.interArd();
                break;
            case 'comment':
                this.interIOS();
                break;
            case 'article':
                alert(sb_value);
                break;
            case 'resource':
                this.openCWindow(sb_value)
                break;
        }
    }

    async wechatShare() {
        try {
            await wechatUtil.init();
            wechatUtil.setShareParam({
                title: '这是标题',
                link: location.href,
                imgUrl:
                    'http://www.bstcine.com/f/2018/09/21/165917424Snd85UE.png',
                desc: '我是描述',
            });
        } catch (e) {
            console.log(e);
        }
    }

    async interArd() {
        if (interSiteCodeUtil.inIOSAPP()) {
            let list = await Bridge.ios(BRIDGE_EVENT.INSTALLED_APP_LIST);
            if (list && list.wechat === 1) {
                let res = await Bridge.ios(BRIDGE_EVENT.SHARE, {
                    title: '这是标题',
                    link: location.href,
                    imgUrl:
                        'http://www.bstcine.com/f/2018/09/21/165917424Snd85UE.png',
                    desc: '我是描述',
                });
                if (res && res.shareSuccess === 1) {
                    alert('已分享[from browser]');
                }
            } else {
                alert('未安装微信[from browser]');
            }
        }
    }

    async interIOS() {
        if (interSiteCodeUtil.inAndroidAPP()) {
            let list = await Bridge.android(BRIDGE_EVENT.INSTALLED_APP_LIST);
            if (list && list.wechat === 1) {
                let res = await Bridge.android(BRIDGE_EVENT.SHARE, {
                    title: '这是标题',
                    link: location.href,
                    imgUrl:
                        'http://www.bstcine.com/f/2018/09/21/165917424Snd85UE.png',
                    desc: '我是描述',
                });
                if (res && res.shareSuccess === 1) {
                    alert('已分享[from browser]');
                }
            } else {
                alert('未安装微信[from browser]');
            }
        }
    }

    openCWindow(sb_value) {
        const {courses }= this.props
        const courseList = courses ? courses.toJS() : [];
        const item =courseList[1]
        CWindow.open({
            children:(<div className="www">
                <p>标题：{item.name}</p>
                <p>金额：{item.price}</p>
            </div>)
        })
    }

    render() {
        const { isMentor, courses, teachers } = this.props;
        const courseList = courses ? courses.toJS() : [];
        const teacherList = teachers.toJS();

        return (
            <React.Fragment>
                <SideBarSubPage
                    layout={this.props.layout}
                    isMentor={isMentor}
                    value={this.state.sbValue}
                    onChange={this.onChangeFromSB}
                />

                <CPanel title="核心课程">
                    <CCardContainer layout="234">
                        <CourseList list={courseList} hover="lighten" />
                    </CCardContainer>
                </CPanel>

                <CPanel title="私塾导师" className="bg-blue">
                    <CCardContainer layout="245">
                        <TeacherList
                            list={teacherList}
                            isMentor={isMentor}
                            limit={10}
                        />
                    </CCardContainer>
                </CPanel>
            </React.Fragment>
        );
    }
}
