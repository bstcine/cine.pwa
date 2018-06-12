import * as h5 from './menuItemUrl';

const cineMenu = {
    learn: [
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
        },
        {
            label: '我的作业',
            url: h5.URL_Learn_Task,
            icon: '',
            icon_path: '',
            with_mentor: true,
        },
    ],
    user: [
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
        {
            label: '我的订单',
            url: h5.URL_User_Order,
            icon: '',
            icon_path: '',
            visible: false,
        },
    ],
    mentor: [
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
};

export default cineMenu;
