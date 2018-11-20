import * as actionType from '../constant';

const subPageAction = {
    initData: type => async (dispatch, getState) => {
        alert(JSON.stringify(type));
    },
};

export default subPageAction;
