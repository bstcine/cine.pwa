import * as h5 from './menuItemUrl';

const cineMenu = {
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
};

export default cineMenu;
