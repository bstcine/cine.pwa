const cookie = {
    set: (key, value, exp = 48 * 3600 * 1000) => {
        let expires = '; max-age=' + exp;
        document.cookie =
            encodeURIComponent(key) +
            '=' +
            encodeURIComponent(value) +
            expires +
            '; path=/';
    },
    get: key => {
        return (
            decodeURIComponent(
                document.cookie.replace(
                    new RegExp(
                        '(?:(?:^|.*;)\\s*' +
                            encodeURIComponent(key).replace(
                                /[\-\.\+\*]/g,
                                '\\$&'
                            ) +
                            '\\s*\\=\\s*([^;]*).*$)|^.*$'
                    ),
                    '$1'
                )
            ) || null
        );
    },
    remove: key => {
        if (
            new RegExp(
                '(?:^|;\\s*)' +
                    encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') +
                    '\\s*\\='
            ).test(document.cookie)
        ) {
            document.cookie =
                encodeURIComponent(key) +
                '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
    },
};

const session = {
    set: (key, value) => {
        sessionStorage.setItem(key, _serialize(value));
        return value;
    },
    get: key => {
        return _deserialize(sessionStorage.getItem(key));
    },
    remove: key => {
        sessionStorage.removeItem(key);
    },
    clear: () => {
        sessionStorage.clear();
    },
};

const local = {
    set: (key, value) => {
        localStorage.setItem(key, _serialize(value));
        return value;
    },
    get: key => {
        return _deserialize(localStorage.getItem(key));
    },
    remove: key => {
        localStorage.removeItem(key);
    },
    clear: () => {
        localStorage.clear();
    },
};

function _serialize(obj) {
    return JSON.stringify(obj);
}

function _deserialize(value) {
    let str = '';
    try {
        str = JSON.parse(value);
    } catch (e) {
        str = value;
    }
    return str;
}

function _which(type) {
    if (!type) return local;
    switch (type.toLowerCase()) {
        case 'cookie':
            return cookie;
        case 'session':
            return session;
        case 'local':
        default:
            return local;
    }
}

const storeUtil = {
    set: (key, value, type) => {
        const store = _which(type);
        if (typeof value === 'undefined') {
            store.remove(key);
            return;
        }
        return store.set(key, value);
    },
    get: (key, type) => {
        const store = _which(type);
        return store.get(key);
    },
    remove: (key, type) => {
        const store = _which(type);
        store.remove(key);
    },

    // cookie 保存 token 与服务端保持同步
    setToken: token => {
        return storeUtil.set('token', token, 'cookie');
    },
    getToken: () => {
        return storeUtil.get('token', 'cookie');
    },
    removeToken: () => {
        storeUtil.remove('token', 'cookie');
    },
    // 保存在sessionStorage
    setSiteCode: sitecode => {
        return storeUtil.set('sitecode', sitecode, 'session');
    },
    getSiteCode: () => {
        return storeUtil.get('sitecode', 'session');
    },
    removeSiteCode: () => {
        storeUtil.remove('sitecode', 'session');
    },
};

export default storeUtil;
