import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'material-ui';

// import TextField from '@material-ui/core/TextField';

import NativeSelect from '@material-ui/core/NativeSelect';

const CFlatButton = props => {
    return <FlatButton {...props} />;
};

export const CDatePicker = ({ defaultValue, onChange }) => {
    return (
        <TextField
            id="date"
            type="date"
            defaultValue={defaultValue}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={onChange}
        />
    );
};

export const CSelect = ({defaultValue, values, onChange}) => {

    const children = values.map(item => {
        return <option value={item.key} >{item.value}</option>
    });

    return (
        <NativeSelect
            value={defaultValue}
            onChange={onChange}
        >
            <option value='' >none</option>
            {children}
        </NativeSelect>
    );
}

export { CFlatButton, Dialog as CDialog, TextField as CTextField };
