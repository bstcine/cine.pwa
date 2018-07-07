import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from './Button';

const CFlatButton = props => {
    return <FlatButton {...props} />;
};

export const CDatePicker = ({ defaultValue, label, onChange }) => {
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

export const CSelect = ({ defaultValue, values, onChange }) => {
    const children = values.map(item => {
        return (
            <option key={item.key} value={item.key}>
                {item.value}
            </option>
        );
    });

    return (
        <NativeSelect value={defaultValue} onChange={onChange}>
            <option key={'0'} value={''}>
                none
            </option>
            {children}
        </NativeSelect>
    );
};

export { CFlatButton, Dialog as CDialog, TextField as CTextField, Button };
