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