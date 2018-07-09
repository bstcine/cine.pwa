import React from 'react';
import { CFloatingButton } from './Floating';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import CButton from './Button';

const CFlatButton = props => {
    return <FlatButton {...props} />;
};

const CDatePicker = ({ defaultValue, label, onChange }) => {
    return (
        <TextField
            id="date"
            type="date"
            label={label}
            defaultValue={defaultValue}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={onChange}
        />
    );
};

const CSelect = ({ defaultValue, values, onChange }) => {
    const children = values.map(item => {
        return (
            <option key={item.key} value={item.key}>
                {item.value}
            </option>
        );
    });

    return (
        <NativeSelect value={defaultValue} onChange={onChange}>
            <option key={'0'} value={''} />
            {children}
        </NativeSelect>
    );
};

export {
    CFlatButton,
    Dialog as CDialog,
    TextField as CTextField,
    CButton,
    CDatePicker,
    CFloatingButton,
    CSelect,
};
