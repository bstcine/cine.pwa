const uaUtil = {
    getUserAgent: function() {
        return navigator.userAgent;
    },
    Android: function() {
        return /Android/i.test(uaUtil.getUserAgent());
    },
    AndroidMobile: function() {
        return (
            /Android/i.test(uaUtil.getUserAgent()) &&
            /Mobile/i.test(uaUtil.getUserAgent())
        );
    },
    AndroidTablet: function() {
        return uaUtil.Android() && !uaUtil.AndroidMobile();
    },
    iPhone: function() {
        return /iPhone/i.test(uaUtil.getUserAgent()) && !uaUtil.iPad();
    },
    iPad: function() {
        return /iPad/i.test(uaUtil.getUserAgent());
    },
    iOS: function() {
        return uaUtil.iPad() || uaUtil.iPhone();
    },
    mobile: function() {
        return uaUtil.Android() || uaUtil.iOS();
    },
    phone: function() {
        return uaUtil.iPhone() || uaUtil.AndroidMobile();
    },
    wechat: function() {
        return /micromessenger/i.test(uaUtil.getUserAgent());
    },
    wechatMobile: function() {
        return /micromessenger/i.test(uaUtil.getUserAgent()) && uaUtil.mobile();
    },
    PC: function() {
        return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
    },
};

export default uaUtil;
