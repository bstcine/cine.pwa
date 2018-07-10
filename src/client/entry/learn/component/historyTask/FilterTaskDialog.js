/**
 * Created by lidangkun on 2018/6/22.
 */
import React from 'react';
import moment from 'moment';
import { CFlatButton, CDialog, CDatePicker, CSelect } from '@/component/_base';

const FilterTaskDialog = ({
    isOpen,
    startTime,
    endTime,
    defaultType,
    actions,
}) => {
    const taskTypes = [
        { key: '', value: '全部' },
        { key: '1', value: '视频' },
        { key: '2', value: '习题' },
        { key: '3', value: '习题反馈' },
        { key: '4', value: '词汇' },
    ];

    const dialogActions = [
        <CFlatButton
            key={1}
            label="取消"
            primary={true}
            onClick={() => {
                actions.dialogShow(false);
            }}
        />,
        <CFlatButton
            key={2}
            label="确定"
            primary={true}
            onClick={() => {
                actions.selectResult({
                    start_time: startTime,
                    end_time: endTime,
                    type: defaultType,
                });
            }}
        />,
    ];

    let itemStyle = {
        paddingTop: '0.1rem',
        paddingBottom: '0.1rem',
        fontFamily: 'PingFangSC-Medium',
        fontSize: '0.28rem',
        color: '#3a3b3c',
    };
    let startDate;
    let endDate;
    if (startTime) {
        startDate = new Date(startTime);
        startDate.setHours(0, 0, 0, 0);
    } else {
        startDate = undefined;
    }
    if (endTime) {
        endDate = new Date(endTime);
        endDate.setHours(0, 0, 0, 0);
    } else {
        endDate = undefined;
    }

    return (
        <CDialog
            title="搜索"
            modal={false}
            actions={dialogActions}
            open={isOpen}
            onRequestClose={() => {
                actions.dialogShow(false);
            }}>
            <div style={itemStyle}>时间范围</div>

            <CDatePicker
                key={1000}
                defaultValue={startDate}
                label="开始时间"
                onChange={(event, date) => {
                    // 将时间转换为时间
                    actions.changeStartTime(moment(date).format('YYYY-MM-DD'));
                }}
            />
            <CDatePicker
                key={1001}
                defaultValue={endDate}
                label="结束时间"
                onChange={(event, date) => {
                    actions.changeEndTime(moment(date).format('YYYY-MM-DD'));
                }}
            />
            <br /> <br />
            <div style={itemStyle}>任务类型</div>
            <CSelect
                defaultValue={defaultType}
                values={taskTypes}
                onChange={(event, index, value) => {
                    actions.changeType(value);
                }}
            />
        </CDialog>
    );
};

export default FilterTaskDialog;
