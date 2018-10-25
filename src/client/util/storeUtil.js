import cookieUtil from '@/util/cookieUtil';

const engine = require('store/src/store-engine');
const storages = [
    require('store/storages/localStorage'),
    require('store/storages/cookieStorage'),
];
const plugins = [
    require('store/plugins/defaults'),
    require('store/plugins/expire'),
];
const store = engine.createStore(storages, plugins);

let storeUtil = {
    set: (key, data, exp = 48 * 3600 * 1000) => {
        return store.set(key, data, new Date().getTime() + exp);
    },
    get: key => {
        return store.get(key);
    },
    remove: key => {
        return store.remove(key);
    },
    // cookie 保存 token 与服务端保持同步
    setToken: token => {
        return cookieUtil.set('token', token);
    },
    getToken: () => {
        return cookieUtil.get('token');
    },
    removeToken: () => {
        return cookieUtil.remove('token');
    },
    setSiteCode: sitecode => {
        return storeUtil.set('sitecode', sitecode);
    },
    getSiteCode: () => {
        return storeUtil.get('sitecode');
    },
    removeSiteCode: () => {
        return storeUtil.remove('sitecode');
    },
};

export default storeUtil;
