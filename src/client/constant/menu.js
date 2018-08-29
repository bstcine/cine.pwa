import * as h5 from './menuItemUrl';
import { RoleID } from '@/constant';
/**
 * ===icon===
 * mi-xxx || xxx --> material-icons
 * ci-xxx --> cine-icons
 * 已有样式在 @component/_base/Icon
 * ===icon===
 *
 */
const cineMenu = [
    { label: '首页', url: '/' },
    {
        label: '学习系统',
        url: h5.URL_Learn_Index,
        children: [
            {
                label: '我的学习',
                url: h5.URL_Learn_Index,
                icon: 'ci-stu_work',
                children: [
                    {
                        label: '历史作业',
                        url: h5.URL_Learn_Task,
                    },
                    {
                        label: '练习',
                        url: h5.URL_Quiz_Kj,
                    },
                    {
                        label: '词汇课程',
                        url: h5.URL_Learn_Word_Course,
                    },
                    {
                        label: '词汇学习',
                        url: h5.URL_Learn_Word,
                    },
                    {
                        label: '词汇学习',
                        url: h5.URL_Learn_Word_List,
                    },
                    {
                        label: '词汇卡片式学习',
                        url: h5.URL_Learn_Word_Card,
                    },
                    {
                        label: '词汇测试',
                        url: h5.URL_Learn_Word_Quiz,
                    },
                    {
                        label: '课程播放',
                        url: h5.URL_Learn_Course,
                    },
                ],
            },
        ],
    },
    {
        label: '个人中心',
        url: h5.URL_User_Index,
        children: [
            {
                label: '我的优惠',
                url: h5.URL_User_Coupon,
                icon: 'ci-coupon',
            },
            {
                label: '我的积分',
                url: h5.URL_User_Integral,
                icon: 'ci-integral',
            },
            {
                label: '我的测试',
                url: h5.URL_User_Quiz,
                icon: 'mi-brightness_auto',
                children: [
                    {
                        label: '语法测试',
                        url: h5.URL_Quiz_Grammar,
                    },
                ],
            },
            // {
            //     label: '我的订单',
            //     url: h5.URL_User_Order,
            //     icon: 'mi-payment',
            //     disabled: true,
            // },
            // {
            //     label: '地址管理',
            //     url: h5.URL_User_Address,
            //     icon: 'mi-add_location',
            //     disabled: true,
            // },
        ],
    },
    {
        label: '导师批改',
        url: h5.URL_Mentor_Index,
        role_id: [RoleID.TEACHER, RoleID.ADMINISTRATOR],
        children: [
            {
                label: '学生作业',
                url: h5.URL_Mentor_Student_Task,
                icon: 'ci-edit1',
            },
            {
                label: '学生测试',
                url: h5.URL_Mentor_Student_Quiz,
                icon: 'ci-test',
            },
            {
                label: '待批改列表',
                url: h5.URL_Mentor_CorrectList,
                icon: 'ci-integral',
                disabled: true,
            },
        ],
    },
];

export default cineMenu;
