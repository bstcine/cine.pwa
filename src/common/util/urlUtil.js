import URLParse from 'url-parse'

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
    let URLObj = URLParse(url, true);
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

export let updateUrl = (params, url) => {
    url = url || location.href
    let URLObj = URLParse(url,true)
    URLObj.set('query',Object.assign(URLObj.query,params))
    console.log(`URLObj.toString() ${URLObj.toString()}`)
    return URLObj.toString()
}

export let ignoreParams = (params_arr,url)=>{
    url = url || location.href
    let URLObj = URLParse(url,true)
    params_arr.forEach((param)=>{
        if(URLObj.query[param])
            delete URLObj.query[param]
    })
    URLObj.set('query',URLObj.query)
    console.log(`URLObj.toString() ${URLObj.toString()}`)
    return URLObj.toString()
}