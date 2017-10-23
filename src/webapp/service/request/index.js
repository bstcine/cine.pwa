function requestDemo(obj) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = () => {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }

        xhr.send(obj.data);
        //xhr.send(obj.data);
    });
}

function httpBody(bodyData) {
    let _body = {
        "token": "1384595117-ddc161cb-3b93-4809-a54e-07ac49189737-178953",
        "sitecode": "colr.ios.phone",
        "channel": "",
        "locale": "zh_CN",
        "appver": 10000,
        "data": bodyData
    }
    return _body;
}

function toQueryString(obj) {
    let parts = [],
        i;
    for (i in obj) {
        if (obj.hasOwnProperty(i) && obj[i]) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
    }
    return parts.join("&");
}

function request(obj) {

    return new Promise((resolve, reject) => {

        if (obj.params) {
            obj.url += '?' + toQueryString(obj.params);
        }

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText ? JSON.parse(xhr.responseText) : undefined);
                } else {
                    reject(xhr.responseText);
                }
            }
        };

        xhr.open(obj.method, obj.url, true);
        xhr.setRequestHeader("Accept", "application/json");
        if (obj.contentType) {
            xhr.setRequestHeader("Content-Type", obj.contentType);
        }
        xhr.send(obj.data ? JSON.stringify(obj.data) : undefined);
    });

}

export let demo = (url) => requestDemo({ method: "GET", url });
export let get = (url, params) => request({ method: "GET", url, params });
export let post = (url, data) => {
    let _httpBody = httpBody(data);
    return request({ method: "POST", contentType: "application/json", url, data: _httpBody })
};