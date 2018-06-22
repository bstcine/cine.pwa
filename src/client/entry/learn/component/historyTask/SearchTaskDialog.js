/**
 * Created by lidangkun on 2018/6/22.
 */
import React from 'react';
import { CFlatButton, CDialog, CDatePicker, CList, CListItem, CListItemText, CSelect } from '@/component';

const ListText = (isOpen,list,handleAction)=>{
    return (
        <List>
            {
                list.map(item => {
                    return (<ListItem button onClick={() => handleAction(item)} key={item}>
                        <ListItemText primary={item} />
                    </ListItem>);
                })
            }

        </List>
    );
};

const SearchTaskDialog = ({ isOpen, actions }) => {

    const taskTypes = [
        {'key':'1','value':'视频'},
        {'key':'2','value':'习题'},
        {'key':'3','value':'习题反馈'},
        {'key':'4','value':'单词'},
        {'key':'9','value':'其他'},
    ];

    const dialogActions = [
        <CFlatButton
            key={1}
            label="取消"
            primary={true}
            onClick={()=>{actions.dialogShow(false)}}
        />,
        <CFlatButton
            key={2}
            label="搜索"
            primary={true}
            onClick={()=>{actions.dialogShow(false)}}
        />,
    ];

    let itemStyle = {
        paddingTop:"0.1rem",
        paddingBottom:"0.1rem",
        fontFamily: "PingFangSC-Medium",
        fontSize:"0.28rem",
        color:"#3a3b3c",
    }

    let formStyle = {
        fontSize: "0.28rem",
    }

    return (
            <CDialog
                title="任务搜索"
                modal={false}
                actions={dialogActions}
                open={isOpen}
                onRequestClose={()=>{actions.dialogShow(false)}} >

                <div style={itemStyle} >时间</div>

                <form  >
                    <CDatePicker
                        defaultValue="2018-06-24"
                        onChange={(e, val) => {
                            alert(val);
                        }}
                    />
                    <CDatePicker
                        defaultValue="2018-06-24"
                        onChange={(e, val) => {
                            alert(val);
                        }}
                    />
                </form>

                <div style={itemStyle} >类型</div>

                <form noValidate>
                    <CSelect
                        defaultValue="单词"
                        values={taskTypes}
                        onChange={(e,val)=>{
                            alert(val);
                        }}
                    />
                </form>

            </CDialog>
    );
};

export default SearchTaskDialog;
