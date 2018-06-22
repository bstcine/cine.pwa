import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'material-ui';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
                shrink: true
            }}
            onChange={onChange}
        />
    );
};

export const CSelect = ({defaultValue, values, onChange}) => {

    const children = values.map(item => {
        return <MenuItem value={item.key}>{item.value}</MenuItem>
    });

    return (
        <div>
            <Select
                value={defaultValue}
                onChange={onChange}
                inputProps={{
                    name: 'age',
                    id: 'age-simple',
                }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {children}
            </Select>
        </div>
    );
}

export { CFlatButton, Dialog as CDialog, TextField as CTextField , List as CList, ListItem as CListItem , ListItemText as CListItemText };
