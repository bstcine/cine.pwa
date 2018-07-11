import React from 'react';
import { CFloatingButton } from './Floating';
import { CSelectField } from './SelectField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import CButton from './Button';

const CFlatButton = props => {
    return <FlatButton {...props} />;
};

const CDatePicker = ({ defaultValue, label, onChange }) => {
    return (
        <DatePicker
            defaultDate={defaultValue}
            hintText={label}
            locale="en-US"
            autoOk={true}
            firstDayOfWeek={0}
            onChange={onChange}
        />
    );
};

export {
    CFlatButton,
    Dialog as CDialog,
    TextField as CTextField,
    CButton,
    CDatePicker,
    CFloatingButton,
    CSelectField as CSelect,
};
