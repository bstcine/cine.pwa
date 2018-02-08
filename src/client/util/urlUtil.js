import URLParse from 'url-parse';

export let getPureUrl = () => {
    let url = location.href;
    let index = url.indexOf('#');
    if (index !== -1) {
        url = url.substring(0, index);
    }
    return url;
};

export let getParam = href => {
    let url = href || location.href;
    let URLObj = URLParse(url, true);
    let queryObj = URLObj.query;
    console.log('queryObj',queryObj)
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
    console.log('hashObj',hashObj)
    let obj = Object.assign(hashObj, queryObj);
    return obj;
};

export let addParam = (url = location.href, params) => {
    let URLObj = URLParse(url, true);
    URLObj.set('query', Object.assign(URLObj.query, params));
    return URLObj.toString();
};

export let removeParam = (url = location.href, params_arr) => {
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
