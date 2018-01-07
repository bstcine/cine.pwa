import store from 'store'

let storeUtil = {
    set: (key, data, exp = new Date().getTime() * 48 * 3600 * 1000) => {
        return store.set(key, data, exp)
    },
    get: (key) => {
        return store.get(key)
    },
    remove: (key) => {
        return store.remove(key)
    },
    setToken: (token) => {
        return storeUtil.set('token', token)
    },
    getToken: () => {
        return storeUtil.get('token')
    },
    removeToken: () => {
        return storeUtil.remove('token')
    }
};

export default storeUtil
