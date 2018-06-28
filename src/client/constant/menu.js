import * as h5 from './menuItemUrl';
import { RoleID } from '@/constant';
// ../image/ico_my_study.png
// ../image/ico_integral.png
// ../image/ico_coupon.png
// ../image/ico_wordtest.png
// ../image/ico_grammar.png
// ../image/ico_teacher@2x.png
// ../image/ico_address@2x.png
// ../image/ico_edit1.png
// ../image/ico_quit.png
const cineMenu = [
    { label: '首页', url: '/' },
    {
        label: '学习系统',
        url: h5.URL_Learn_Index,
        children: [
            {
                label: '我的学习',
                url: h5.URL_Learn_Index,
                icon: require('@/entry/user/asset/image/ico_my_study.png'),
                icon_path: '', // remote url
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
                icon: require('@/entry/user/asset/image/ico_coupon.png'),
                icon_path: '',
            },
            {
                label: '我的积分',
                url: h5.URL_User_Integral,
                icon: require('@/entry/user/asset/image/ico_integral.png'),
                icon_path: '',
            },
            {
                label: '我的测试',
                url: h5.URL_User_Quiz,
                icon: require('@/entry/user/asset/image/ico_wordtest.png'),
                icon_path: ''
            },
            {
                label: '我的订单',
                url: h5.URL_User_Order,
                icon: 'payment',
                icon_path: '',
                visible: false,
            },
            {
                label: '地址管理',
                url: h5.URL_User_Address,
                icon: 'add_location',
                icon_path: '',
                visible: false,
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
                icon: require('@/entry/user/asset/image/ico_integral.png'),
                icon_path: '',
            },
            {
                label: '学生测试',
                url: h5.URL_Mentor_Student_Quiz,
                icon: require('@/entry/user/asset/image/ico_integral.png'),
                icon_path: '',
            },
            {
                label: '待批改列表',
                url: h5.URL_Mentor_CorrectList,
                icon: require('@/entry/user/asset/image/ico_integral.png'),
                icon_path: '',
                visible: false,
            },
        ],
    },
];

export default cineMenu;
