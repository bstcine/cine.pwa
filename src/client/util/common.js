import storeUtil from '@/util/_base/storeUtil';

const CommonUtil = {
    updateObject: (oldObject, newValues) => {
        return Object.assign({}, oldObject, newValues);
    },
    updateItemInArray: (array, itemId, updateItemCallback) => {
        return array.map(item => {
            if (item.id !== itemId) {
                return item;
            }
            return updateItemCallback(item);
        });
    },

    /**
     * @ 获取不重复的随机数（int）
     * @param max 最大范围
     * @param count 获取的数量
     * @return 随机数组
     */
    getRandomNumbers: (max, count) => {
        let numbers = [];
        while (numbers.length < count) {
            let randomNumer = CommonUtil.getRandomNumber(max);
            if (numbers.length === 0) {
                numbers.push(randomNumer);
                continue;
            }
            let hadNumber = false;
            for (let i = 0; i < numbers.length; i++) {
                if (numbers[i] === randomNumer) {
                    hadNumber = true;
                    break;
                }
            }
            if (!hadNumber) {
                numbers.push(randomNumer);
            }
        }
        return numbers;
    },
    /**
     * @ 获取随机数
     * @ max 最大范围
     * @return 生成数值
     * */
    getRandomNumber: max => {
        return Math.round(Math.random() * max);
    },

    smsCountDown: callback => {
        let count = 60;
        let timmer = setInterval(() => {
            count--;
            if (count === 0) {
                callback('发送验证码', false);
                clearInterval(timmer);
            } else {
                callback(`已发送(${count}s)`, true);
            }
        }, 1000);
    },

    isAuth: () => {
        if (!storeUtil.getToken()) {
            location.href =
                '/auth/signin?redirect=' + encodeURIComponent(location.href);
            return false;
        } else {
            return true;
        }
    },
    getCurrencySymbol: currency => {
        return currency === 'USD' ? '$' : '￥';
    },
    getImageHref: imgUrl => {
        if (imgUrl.indexOf('static.bstcine.com') !== -1) {
            return imgUrl;
        } else if (imgUrl.startsWith('http')) {
            return imgUrl;
        } else {
            return `//www.bstcine.com/f/${imgUrl}`;
        }
    },
    getImageBackground: imgUrl => {
        return `url(${
            imgUrl ? CommonUtil.getImageHref(imgUrl) : ''
        }) center center / cover no-repeat`;
    },
};

export default CommonUtil;
