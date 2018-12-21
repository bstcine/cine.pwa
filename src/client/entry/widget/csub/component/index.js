import React from 'react';
import { CPanel, CCardContainer, CWindow } from '@/component/_base';
import { CourseList, TeacherList } from '@/component/CardItem';
import { SideBarPWAH5 } from '@/component/SideBar/PWAH5';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import Bridge from '@/util/_base/interBridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import authUtil from '@/util/authUtil';
import { getParam, removeParam } from "@/util/_base/urlUtil";
import shareUtil from "@/util/_base/shareUtil";
import errorMsg from "@/util/errorMsg";

export default class SubPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sbValue: 'course',
        };

        this.onChangeFromSB = this.onChangeFromSB.bind(this);
    }

    componentDidMount() {
        this.wxInit();
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
                authUtil.login();
                break;
            case 'resource':
                this.openCWindow(sb_value);
                break;
        }
    }

    async wechatShare() {
        let [err, result] = await shareUtil.createShareLog({
            type:4,
            cid:42,
        });
        if (err) return alert(errorMsg(err));
        let {
            sharelog_id,
            share_title,
            share_link,
            share_imgUrl,
            share_desc,
        } = result;
        let share_params = {
            sharelog_id: sharelog_id,
            title: share_title,
            link: share_link,
            imgUrl: share_imgUrl,
            desc: share_desc,
        };
        await shareUtil.share(share_params);
    }

    async wxInit() {
        try {
            await shareUtil.init();
            let { sharelog_id } = getParam();
            if (sharelog_id) return;
            let [err, result] = await shareUtil.createShareLog({
                type: 4,
                cid: 42,
            });
            if (err) return alert(errorMsg(err));
            console.log('initWechat', result);
            let { share_title, share_link, share_imgUrl, share_desc } = result;
            shareUtil.setShareParam({
                title: share_title,
                link: removeParam(share_link, ['token', 'share_mask']),
                imgUrl: share_imgUrl,
                desc: share_desc,
            });
        } catch (e) {
            console.warn(e);
        }
    }

    async interIOS() {
        alert('ios 分享');
        if (interSiteCodeUtil.inIOSAPP()) {
            let list = await Bridge.ios(BRIDGE_EVENT.INSTALLED_APP_LIST);
            if (list && list.wechat === 1) {
                let res = await Bridge.ios(BRIDGE_EVENT.SHARE, {
                    sharelog_id: '-1',
                    title: '这是标题【ios分享出来的】',
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

    async interArd() {
        alert('android interaction');
        if (interSiteCodeUtil.inAndroidH5()) {
            alert('send');
            await Bridge.android(BRIDGE_EVENT.OPEN_LESSON_PLAY_WINDOW, {
                cid: '42',
            });
            alert('done');
        }
    }

    openCWindow(sb_value) {
        const { courses } = this.props;
        const courseList = courses ? courses.toJS() : [];
        const item = courseList[1];
        CWindow.open({
            children: (
                <div className="www">
                    <p>标题：{item.name}</p>
                    <p>金额：{item.price}</p>
                </div>
            ),
        });
    }

    render() {
        const { isMentor, courses, teachers } = this.props;
        const courseList = courses ? courses.toJS() : [];
        const teacherList = teachers.toJS();

        return (
            <React.Fragment>
                <SideBarPWAH5
                    layout={this.props.layout}
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
