import * as h5 from './menuItemUrl';
import { RoleID } from '@/constant';
/**
 * ===icon===
 * mi-xxx --> material-icons
 * ci-xxx --> cine-icons
 * 已有样式在 @component/GIcon/style.less
 * ===icon===
 *
 * ===icon_path===
 * icon_path: require('@/entry/user/asset/image/ico_integral.png')
 * icon_path: '//www.bstcine.com/asset/image/ico_headpic.d8668494.png'
 * remote url 建议以 `//` 开头，便于 http/https 切换
 * ===icon_path===
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
                icon: 'ci-my_study',
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
                icon: 'ci-grammar',
            },
            {
                label: '我的订单',
                url: h5.URL_User_Order,
                icon: 'mi-payment',
                disabled: true,
            },
            {
                label: '地址管理',
                url: h5.URL_User_Address,
                icon: 'mi-add_location',
                disabled: true,
            },
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
                icon_path:
                    '//www.bstcine.com/asset/image/ico_headpic.d8668494.png',
            },
            {
                label: '学生测试',
                url: h5.URL_Mentor_Student_Quiz,
                icon_path: require('@/entry/user/asset/image/ico_integral.png'),
            },
            {
                label: '待批改列表',
                url: h5.URL_Mentor_CorrectList,
                icon_path: require('@/entry/user/asset/image/ico_integral.png'),
                disabled: true,
            },
        ],
    },
];

export default cineMenu;
