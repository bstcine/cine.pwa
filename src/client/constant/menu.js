import * as h5 from './menuItemUrl';
import { RoleID } from '@/constant';

const cineMenu = [
    { label: '首页', url: '/' },
    {
        label: '学习首页',
        url: h5.URL_Learn_Index,
        children: [
            {
                label: '我的学习',
                url: h5.URL_Learn_Index,
                icon: '',
                icon_path: '',
            },
            {
                label: '我的测试',
                url: h5.URL_User_Exam,
                icon: '',
                icon_path: '',
                visible: false,
            },
        ],
    },
    {
        label: '个人中心',
        url: h5.URL_User_Index,
        children: [
            {
                label: '我的优惠券',
                url: h5.URL_User_Coupon,
                icon: '',
                icon_path: '',
            },
            {
                label: '我的积分',
                url: h5.URL_User_Integral,
                icon: '',
                icon_path: '',
            },
            // {
            //     label: '我的订单',
            //     url: h5.URL_User_Order,
            //     icon: '',
            //     icon_path: '',
            //     visible: false,
            // },
        ],
    },
    {
        label: '老师批改',
        url: h5.URL_Mentor_Index,
        role_id: [RoleID.TEACHER, RoleID.ADMINISTRATOR],
        children: [
            {
                label: '学生列表',
                url: h5.URL_Mentor_StudentList,
                icon: '',
                icon_path: '',
            },
            {
                label: '待批改列表',
                url: h5.URL_Mentor_CorrectList,
                icon: '',
                icon_path: '',
                visible: false,
            },
        ],
    },
];

export default cineMenu;