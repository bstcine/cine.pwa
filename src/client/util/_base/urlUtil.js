import URLParse from 'url-parse';

export let getPureUrl = () => {
    return location.href.split('#')[0];
};

export let getParam = href => {
    let url = href || location.href;
    let URLObj = URLParse(url, true);
    let queryObj = URLObj.query;
    let hashObj = {};

    if (process.env.MODE === 'static') {
        let index1 = url.indexOf('#');
        let index2 = url.indexOf('?');
        if (index1 !== -1 && index2 !== -1 && index2 > index1) {
            let hash = url.substring(index2 + 1, url.length);
            hash.split('&').forEach(item => {
                let arr = item.split('=');
                hashObj[arr[0]] = arr[1];
            });
        }
    }
    let obj = Object.assign(hashObj, queryObj);
    return obj;
};

export let addParam = (_url, params) => {
    let url = _url || location.href;
    let URLObj = URLParse(url, true);
    URLObj.set('query', Object.assign(URLObj.query, params));
    return URLObj.toString();
};

export let removeParam = (_url, params_arr) => {
    let url = _url || location.href;
    let URLObj = URLParse(url, true);
    if (typeof params_arr === 'string') {
        if (URLObj.query[params_arr]) delete URLObj.query[params_arr];
    } else {
        params_arr.forEach(param => {
            if (URLObj.query[param]) delete URLObj.query[param];
        });
    }
    URLObj.set('query', URLObj.query);
    return URLObj.toString();
};

export let getLastPath = path => {
    let pathName = path || location.pathname;
    if (!pathName) {
        return null;
    }
    if (pathName.charAt(pathName.length - 1) === '/') {
        pathName = pathName.slice(0, pathName.length - 1);
    }
    let pathComponent = pathName.split('/');
    let lastPath = pathComponent[pathComponent.length - 1];
    return lastPath;
};
