import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export const CSelectField = ({ defaultValue, values, onChange }) => {
    const children = values.map(item => {
        return (
            <MenuItem
                key={item.key}
                value={item.key}
                primaryText={item.value}
            />
        );
    });

    return (
        <DropDownMenu value={defaultValue} onChange={onChange}>
            {children}
        </DropDownMenu>
    );
};
