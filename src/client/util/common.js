const CommonUtil = {
    updateObject: (oldObject, newValues) => {
        return Object.assign({}, oldObject, newValues);
    },
    updateItemInArray:(array, itemId, updateItemCallback) => {
        return array.map(item => {
            if(item.id !== itemId) {
                return item;
            }
            return updateItemCallback(item);
        })
    }
}

export default CommonUtil;