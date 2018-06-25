/**
 * Created by lidangkun on 2018/6/15.
 */
import { fromJS } from 'immutable';
import { ACTION_LH } from '@/constant/actionTypeLearn';

const initTaskPageState = fromJS({
    selectType: 0,
    isDialogShow:false,
    taskModels:[],
    startTime:'',
    endTime:'',
    defaultType:'',
});

const historyTaskRedu = (state = initTaskPageState, action) => {

    switch (action.type) {
        case ACTION_LH.RECEIVE:
            return state.set('taskModels',action.payload);
        case ACTION_LH.DIALOG:
            return state.set('isDialogShow',action.payload);
        case ACTION_LH.CHANGESTARTTIME:
            return state.set('startTime',action.payload);
        case ACTION_LH.CHANGEENDTIME:
            return state.set('endTime',action.payload);
        case ACTION_LH.CHANGETYPE:
            return state.set('defaultType',action.payload);
        default:
            return state;
    }
}

export default historyTaskRedu;