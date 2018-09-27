import storeUtil from '@/util/storeUtil';

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
    isAuth: () => {
        if (!storeUtil.getToken()) {
            location.href = '/login?go=' + encodeURIComponent(location.href);
            return false;
        } else {
            return true;
        }
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
    getCurrencySymbol: currency => {
        return currency === 'USD' ? '$' : '￥';
    },
};

export default CommonUtil;
