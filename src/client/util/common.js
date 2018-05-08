import storeUtil from '@/util/storeUtil';

const CommonUtil = {
    updateObject: (oldObject, newValues) => {
        return Object.assign({}, oldObject, newValues);
    },
    updateItemInArray: (array, itemId, updateItemCallback) => {
        return array.map(item => {
            if (item.id !== itemId) {
                return item;
            }
            return updateItemCallback(item);
        });
    },
    isAuth: () => {
        if (!storeUtil.getToken()) {
            location.href = '/login?go=' + encodeURIComponent(location.href);
            return false;
        } else {
            return true;
        }
    },
};

export default CommonUtil;
