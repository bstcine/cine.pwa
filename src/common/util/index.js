import store from 'store'
import URL from 'url'

export let isSafari = () => {
    let browser = navigator.appName;
    let _version = navigator.appVersion.toLowerCase();
    return _version.indexOf("applewebkit") > 0 && _version.indexOf("chrome/") <= 0;
}

export let isImage = (src) => {
    let _src = src.toLowerCase();

    if (_src.lastIndexOf('.png') > 0) {
        return true;
    }
    if (_src.lastIndexOf('.jpg') > 0) {
        return true;
    }

    return false;
}

export let getParam = (href) => {
    let url = href || location.href
    let URLObj = URL.parse(url, true);
    return URLObj.query
}

export let getSearchParam = (search) => {
    let parsedObj = {}
    search.replace('?', '').split('&').forEach(function (item) {
        let key = item.split('=')[0]
        let value = item.split('=')[1]
        parsedObj[key] = value
    })
    return parsedObj
}
