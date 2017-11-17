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

export let getUrlParam = (name) => {
    var url = location.href
    return getParam(url, name)
}

export let getParam = (url, name) => {

    var i = url.indexOf('?');
    if (i != -1) {
        url = '&' + url.substring(i + 1) + '&';
    }
    name = '&' + name + '=';
    var j = url.indexOf(name);
    if (j != -1) {
        var k = url.indexOf('&', j + name.length);
        return url.substring(j + name.length, k);
    }
    return "";

}