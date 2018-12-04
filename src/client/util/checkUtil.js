let checkUtil = {

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
};

export default checkUtil;
