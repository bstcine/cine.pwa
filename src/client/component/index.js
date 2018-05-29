import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'material-ui';

const CFlatButton = props => {
    return <FlatButton {...props} />;
};

export { CFlatButton, Dialog as CDialog, TextField as CTextField };
