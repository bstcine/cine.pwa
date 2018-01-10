import storeUtil from "@/util/storeUtil";
import uaUtil from "@/util/uaUtil";
import siteCodeUtil from "@/util/sitecodeUtil";

const bstcineImg = require('@/asset/image/pic_bstcine.png');
const btnImg = require('@/asset/image/btn_download.png');
const closeImg = require('@/asset/image/ico_appdow_close.png');


var appBanner = {
    init: function () {
        if (!siteCodeUtil.inAPP() && uaUtil.mobile() && storeUtil.get("appBannerHide") !== 1) {
            window.addEventListener('scroll', appBanner.handlerScroll);
            var $body = document.querySelector('body');
            $body.style.marginTop = '50px';
            $body.appendChild(this.tpl())
        }
    },
    show: function () {
        var $body = document.querySelector('body');
        $body.style.marginTop = '50px';
        document.querySelector('.appBanner').style.display = 'block';
    },
    hide: function () {
        var $body = document.querySelector('body');
        $body.style.marginTop = '0';
        document.querySelector('.appBanner').style.display = 'none';
    },
    remove: function () {
        storeUtil.set('appBannerHide', 1, 2*3600*1000);
        window.removeEventListener('scroll', appBanner.handlerScroll);
        this.hide();
    },
    handlerScroll: function () {
        var $body = document.querySelector('body');
        var offset = $body.getBoundingClientRect();
        var appBannerDisplay = document.querySelector('.appBanner').style.display
        if (offset.top !== 0) {
            if (appBannerDisplay === 'block') {
                appBanner.hide()
            }
        } else {
            if (appBannerDisplay === 'none') {
                appBanner.show()
            }
        }
    },
    tpl: function () {
        var s = (
            '<div class="appBanner" style="display:block;height: 50px;line-height: 50px;position: fixed;top: 0;left: 0;width: 100%;background-color: rgba(35,34,39,0.98);z-index: 100;box-shadow: 0 9px 17px 2px rgba(35, 34, 39, 0.12);opacity: 0.98;">' +
            '<div class="appBannerImg" style="height: 50px;line-height: 50px;position: absolute;top: 0;left: 7px;">' +
            `<img style="display: inline-block;height: 50px;line-height: 50px;padding:5px 0" src="${bstcineImg}" alt="">` +
            '</div>' +
            '<div class="downloadApp" style="position: absolute;right: 42px;top: 0;height: 50px;">' +
            `<a href="/mAppDownload"><img style="display: inline-block;height: 50px;line-height: 50px;padding:10px 0" src="${btnImg}" alt=""></a>` +
            '</div>' +
            '<div class="closeAppBanner" style="position: absolute;right: 14px;top: 0;font-size: 14px;height: 50px;line-height:50px;" onclick="appBanner.remove()">' +
            `<img style="display: inline-block;height: 13px;margin: auto;" src="${closeImg}" alt="">` +
            '</div>' +
            '</div>'
        )
        var div = document.createElement('div');
        div.innerHTML = s;
        return div.firstChild;
    }
};
if (!window.appBanner) {
    window.appBanner = appBanner
}

export default appBanner