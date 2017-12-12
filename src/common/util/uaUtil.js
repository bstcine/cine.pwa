const uaUtil = {
    getUserAgent: () => {
        return navigator.userAgent;
    },
    Android: function() {
        return /Android/i.test(uaUtil.getUserAgent()) && !uaUtil.Windows();
    },
    BlackBerry: function() {
        return /BlackBerry|BB10|PlayBook/i.test(uaUtil.getUserAgent());;
    },
    iPhone: function() {
        return /iPhone/i.test(uaUtil.getUserAgent()) && !uaUtil.iPad() && !uaUtil.Windows();
    },
    iPod: function() {
        return /iPod/i.test(uaUtil.getUserAgent());
    },
    iPad: function() {
        return /iPad/i.test(uaUtil.getUserAgent());
    },
    iOS: function() {
        return (uaUtil.iPad() || uaUtil.iPod() || uaUtil.iPhone());
    },
    Opera: function() {
        return /Opera Mini/i.test(uaUtil.getUserAgent());
    },
    Windows: function() {
        return /Windows Phone|IEMobile|WPDesktop/i.test(uaUtil.getUserAgent());
    },
    KindleFire: function() {
        return /Kindle Fire|Silk|KFAPWA|KFSOWI|KFJWA|KFJWI|KFAPWI|KFAPWI|KFOT|KFTT|KFTHWI|KFTHWA|KFASWI|KFTBWI|KFMEWI|KFFOWI|KFSAWA|KFSAWI|KFARWI/i.test(uaUtil.getUserAgent());
    },
    mobile: function() {
        return (uaUtil.Android() || uaUtil.BlackBerry() || uaUtil.iOS() || uaUtil.Opera() || uaUtil.Windows());
    },
    wechat:function () {
        return /micromessenger/i.test(uaUtil.getUserAgent())
    }
};

export default uaUtil;