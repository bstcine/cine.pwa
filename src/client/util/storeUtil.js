const engine = require('store/src/store-engine');
const storages = [
    require('store/storages/localStorage'),
    require('store/storages/cookieStorage')
];
const plugins = [
    require('store/plugins/defaults'),
    require('store/plugins/expire')
];
const store = engine.createStore(storages, plugins);

let storeUtil = {
    set: (key, data, exp = 48 * 3600 * 1000) => {
        return store.set(key, data, new Date().getTime() + exp)
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
    },
    setSiteCode: (sitecode) => {
        return storeUtil.set('sitecode', sitecode)
    },
    getSiteCode: () => {
        return storeUtil.get('sitecode')
    },
    removeSiteCode: () => {
        return storeUtil.remove('sitecode')
    }
};

export default storeUtil
