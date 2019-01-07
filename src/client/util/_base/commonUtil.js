import storeUtil from './storeUtil';

const commonUtil = {
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
     */
    getRandomNumbers: (max, count) => {
        let numbers = [];
        while (numbers.length < count) {
            let randomNumer = commonUtil.getRandomNumber(max);
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
        } else if (location.protocol === 'file:') {
            return `http://www.bstcine.com/f/${imgUrl}`;
        } else {
            return `//www.bstcine.com/f/${imgUrl}`;
        }
    },
    getImageBackground: imgUrl => {
        return `url(${
            imgUrl ? commonUtil.getImageHref(imgUrl) : ''
        }) center center / cover no-repeat`;
    },

    isPhone: function(phone_code, phone) {
        let number_pattern = /^[0-9]+$/;
        // phone_code,phone 全数字校验
        if (!number_pattern.test(phone_code) || !number_pattern.test(phone)) {
            return false;
        }
        if (phone_code === '86') {
            // 国内手机号 11位 1开头 校验
            if (/^1[0-9]{10}$/.test(phone)) {
                return true;
            }
        } else {
            // 国外手机号 4位及以上长度校验
            if (/^[0-9]{4,}$/.test(phone)) {
                return true;
            }
        }
        return false;
    },

    isEmail: function(email) {
        // 低校验：不包含空白字符且中间含有 @
        let reg = /^\S+@\S+$/;
        return reg.test(email);
    },

    isPassword: function(password) {
        if (!password || !password.trim()) {
            return false;
        }
        return /^[0-9a-zA-Z]{6,}$/.test(password);
    },

    durationFormat: (duration, format = 1) => {
        let sec_num = parseInt(duration, 10);
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - hours * 3600) / 60);
        let seconds = sec_num - hours * 3600 - minutes * 60;

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (format === 1) {
            return hours + ':' + minutes + ':' + seconds;
        } else {
            let time = '';
            if (hours !== '00') {
                time += hours + '时';
            }
            if (minutes !== '00') {
                time += minutes + '分';
            }
            if (seconds !== '00') {
                time += seconds + '秒';
            }
            return time;
        }
    },
    durationShortFormat: duration => {
        let number = parseInt(duration, 10);
        let sec = number % 60;
        let min = (number - sec) / 60;
        let str = '';
        min && (str += min + "'");
        sec && (str += sec + "''");
        return str;
    },
    shortTime: timeStr => {
        return timeStr.substring(0, 10);
    },
};

export default commonUtil;
