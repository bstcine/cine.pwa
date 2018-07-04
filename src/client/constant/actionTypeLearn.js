/**
 * Created by joe on 4/19/18.
 */
export const ACTION_LV = {
    REQUEST: 'LV_REQUEST',
    RECEIVE: 'LV_RECEIVE',
    TASKSTATUS: 'LV_TASKSTATUS',
};

export const ACTION_LH = {
    REQUEST: 'LH_REQUEST',
    RECEIVE: 'LH_RECEIVE',
    DIALOG: 'LH_DIALOG',
    CHANGETYPE: 'LH_CHANGETYPE',
    CHANGESTARTTIME: 'LH_CHANGESTARTTIME',
    CHANGEENDTIME: 'LH_CHANGEENDTIME',
};

export const ACTION_LT = {
    SAVEPARAM: 'LT_SAVEPARAM',
    REQUEST: 'LT_REQUEST',
    RECEIVE: 'LT_RECEIVE',
    TASKSTATUS: 'LT_TASKSTATUS',
    CHANGEWORDCOUNT: 'LT_CHANGEWORDCOUNT',
    STARTTEST: 'LT_STARTTEST',
    CHANGECONTENT: 'LT_CHANGECONTENT',
    CORRECTCOUNT: 'LT_CORRECTCOUNT',
    CHANGESELECTSTATUS: 'LT_CHANGESELECTSTATUS',
    CHANGEFAILEINDEX: 'LT_CHANGEFAILEINDEX',
    CHANGEFAILEINDEXARRAY: 'LT_CHANGEFAILEINDEXARRAY',
    CHANGEFAILETEMPINDEXARRAY: 'LT_CHANGEFAILETEMPINDEXARRAY',
};

export const REQUEST_CURRENT_TASK = 'REQUEST_CURRENT_TASK';
export const RECEIVE_CURRENT_TASK = 'RECEIVE_CURRENT_TASK';

export const REQUEST_MY_COURSE_LIST = 'REQUEST_MY_COURSE_LIST';
export const RECEIVE_MY_COURSE_LIST = 'RECEIVE_MY_COURSE_LIST';
