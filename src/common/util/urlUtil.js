import URL from 'url'

export let getPureUrl = () => {
    let url = location.href;
    let index = url.indexOf('#');
    if (index !== -1) {
        url = url.substring(0, index);
    }
    return url;
}

export let getParam = (href) => {
    let url = href || location.href
    let URLObj = URL.parse(url, true);
    return URLObj.query
}

export let getSearchParam = (search) => {
    let parsedObj = {}
    search.replace('?', '').split('&').forEach(item => {
        let key = item.split('=')[0]
        parsedObj[key] = item.split('=')[1]
    })
    return parsedObj
}
